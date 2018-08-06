package es.imserso.techfile.web.rest;

import es.imserso.techfile.TechfileApp;

import es.imserso.techfile.domain.Proceso;
import es.imserso.techfile.repository.ProcesoRepository;
import es.imserso.techfile.service.ProcesoService;
import es.imserso.techfile.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static es.imserso.techfile.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import es.imserso.techfile.domain.enumeration.ResultadoProceso;
/**
 * Test class for the ProcesoResource REST controller.
 *
 * @see ProcesoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TechfileApp.class)
public class ProcesoResourceIntTest {

    private static final LocalDate DEFAULT_FECHA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA = LocalDate.now(ZoneId.systemDefault());

    private static final Long DEFAULT_DURACION = 1L;
    private static final Long UPDATED_DURACION = 2L;

    private static final ResultadoProceso DEFAULT_RESULTADO = ResultadoProceso.OK;
    private static final ResultadoProceso UPDATED_RESULTADO = ResultadoProceso.OK_CON_ERRORES;

    @Autowired
    private ProcesoRepository procesoRepository;

    

    @Autowired
    private ProcesoService procesoService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restProcesoMockMvc;

    private Proceso proceso;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProcesoResource procesoResource = new ProcesoResource(procesoService);
        this.restProcesoMockMvc = MockMvcBuilders.standaloneSetup(procesoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Proceso createEntity(EntityManager em) {
        Proceso proceso = new Proceso()
            .fecha(DEFAULT_FECHA)
            .duracion(DEFAULT_DURACION)
            .resultado(DEFAULT_RESULTADO);
        return proceso;
    }

    @Before
    public void initTest() {
        proceso = createEntity(em);
    }

    @Test
    @Transactional
    public void createProceso() throws Exception {
        int databaseSizeBeforeCreate = procesoRepository.findAll().size();

        // Create the Proceso
        restProcesoMockMvc.perform(post("/api/procesos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(proceso)))
            .andExpect(status().isCreated());

        // Validate the Proceso in the database
        List<Proceso> procesoList = procesoRepository.findAll();
        assertThat(procesoList).hasSize(databaseSizeBeforeCreate + 1);
        Proceso testProceso = procesoList.get(procesoList.size() - 1);
        assertThat(testProceso.getFecha()).isEqualTo(DEFAULT_FECHA);
        assertThat(testProceso.getDuracion()).isEqualTo(DEFAULT_DURACION);
        assertThat(testProceso.getResultado()).isEqualTo(DEFAULT_RESULTADO);
    }

    @Test
    @Transactional
    public void createProcesoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = procesoRepository.findAll().size();

        // Create the Proceso with an existing ID
        proceso.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProcesoMockMvc.perform(post("/api/procesos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(proceso)))
            .andExpect(status().isBadRequest());

        // Validate the Proceso in the database
        List<Proceso> procesoList = procesoRepository.findAll();
        assertThat(procesoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllProcesos() throws Exception {
        // Initialize the database
        procesoRepository.saveAndFlush(proceso);

        // Get all the procesoList
        restProcesoMockMvc.perform(get("/api/procesos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(proceso.getId().intValue())))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(DEFAULT_FECHA.toString())))
            .andExpect(jsonPath("$.[*].duracion").value(hasItem(DEFAULT_DURACION.intValue())))
            .andExpect(jsonPath("$.[*].resultado").value(hasItem(DEFAULT_RESULTADO.toString())));
    }
    

    @Test
    @Transactional
    public void getProceso() throws Exception {
        // Initialize the database
        procesoRepository.saveAndFlush(proceso);

        // Get the proceso
        restProcesoMockMvc.perform(get("/api/procesos/{id}", proceso.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(proceso.getId().intValue()))
            .andExpect(jsonPath("$.fecha").value(DEFAULT_FECHA.toString()))
            .andExpect(jsonPath("$.duracion").value(DEFAULT_DURACION.intValue()))
            .andExpect(jsonPath("$.resultado").value(DEFAULT_RESULTADO.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingProceso() throws Exception {
        // Get the proceso
        restProcesoMockMvc.perform(get("/api/procesos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProceso() throws Exception {
        // Initialize the database
        procesoService.save(proceso);

        int databaseSizeBeforeUpdate = procesoRepository.findAll().size();

        // Update the proceso
        Proceso updatedProceso = procesoRepository.findById(proceso.getId()).get();
        // Disconnect from session so that the updates on updatedProceso are not directly saved in db
        em.detach(updatedProceso);
        updatedProceso
            .fecha(UPDATED_FECHA)
            .duracion(UPDATED_DURACION)
            .resultado(UPDATED_RESULTADO);

        restProcesoMockMvc.perform(put("/api/procesos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProceso)))
            .andExpect(status().isOk());

        // Validate the Proceso in the database
        List<Proceso> procesoList = procesoRepository.findAll();
        assertThat(procesoList).hasSize(databaseSizeBeforeUpdate);
        Proceso testProceso = procesoList.get(procesoList.size() - 1);
        assertThat(testProceso.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testProceso.getDuracion()).isEqualTo(UPDATED_DURACION);
        assertThat(testProceso.getResultado()).isEqualTo(UPDATED_RESULTADO);
    }

    @Test
    @Transactional
    public void updateNonExistingProceso() throws Exception {
        int databaseSizeBeforeUpdate = procesoRepository.findAll().size();

        // Create the Proceso

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restProcesoMockMvc.perform(put("/api/procesos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(proceso)))
            .andExpect(status().isBadRequest());

        // Validate the Proceso in the database
        List<Proceso> procesoList = procesoRepository.findAll();
        assertThat(procesoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProceso() throws Exception {
        // Initialize the database
        procesoService.save(proceso);

        int databaseSizeBeforeDelete = procesoRepository.findAll().size();

        // Get the proceso
        restProcesoMockMvc.perform(delete("/api/procesos/{id}", proceso.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Proceso> procesoList = procesoRepository.findAll();
        assertThat(procesoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Proceso.class);
        Proceso proceso1 = new Proceso();
        proceso1.setId(1L);
        Proceso proceso2 = new Proceso();
        proceso2.setId(proceso1.getId());
        assertThat(proceso1).isEqualTo(proceso2);
        proceso2.setId(2L);
        assertThat(proceso1).isNotEqualTo(proceso2);
        proceso1.setId(null);
        assertThat(proceso1).isNotEqualTo(proceso2);
    }
}
