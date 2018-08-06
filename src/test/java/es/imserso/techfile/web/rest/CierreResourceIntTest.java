package es.imserso.techfile.web.rest;

import es.imserso.techfile.TechfileApp;

import es.imserso.techfile.domain.Cierre;
import es.imserso.techfile.domain.Mes;
import es.imserso.techfile.domain.Mes;
import es.imserso.techfile.repository.CierreRepository;
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

/**
 * Test class for the CierreResource REST controller.
 *
 * @see CierreResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TechfileApp.class)
public class CierreResourceIntTest {

    private static final LocalDate DEFAULT_FECHA_CIERRE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_CIERRE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private CierreRepository cierreRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCierreMockMvc;

    private Cierre cierre;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CierreResource cierreResource = new CierreResource(cierreRepository);
        this.restCierreMockMvc = MockMvcBuilders.standaloneSetup(cierreResource)
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
    public static Cierre createEntity(EntityManager em) {
        Cierre cierre = new Cierre()
            .fechaCierre(DEFAULT_FECHA_CIERRE);
        // Add required entity
        Mes mes = MesResourceIntTest.createEntity(em);
        em.persist(mes);
        em.flush();
        cierre.setMesCerrado(mes);
        // Add required entity
        cierre.setMesAbierto(mes);
        return cierre;
    }

    @Before
    public void initTest() {
        cierre = createEntity(em);
    }

    @Test
    @Transactional
    public void createCierre() throws Exception {
        int databaseSizeBeforeCreate = cierreRepository.findAll().size();

        // Create the Cierre
        restCierreMockMvc.perform(post("/api/cierres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cierre)))
            .andExpect(status().isCreated());

        // Validate the Cierre in the database
        List<Cierre> cierreList = cierreRepository.findAll();
        assertThat(cierreList).hasSize(databaseSizeBeforeCreate + 1);
        Cierre testCierre = cierreList.get(cierreList.size() - 1);
        assertThat(testCierre.getFechaCierre()).isEqualTo(DEFAULT_FECHA_CIERRE);
    }

    @Test
    @Transactional
    public void createCierreWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cierreRepository.findAll().size();

        // Create the Cierre with an existing ID
        cierre.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCierreMockMvc.perform(post("/api/cierres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cierre)))
            .andExpect(status().isBadRequest());

        // Validate the Cierre in the database
        List<Cierre> cierreList = cierreRepository.findAll();
        assertThat(cierreList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCierres() throws Exception {
        // Initialize the database
        cierreRepository.saveAndFlush(cierre);

        // Get all the cierreList
        restCierreMockMvc.perform(get("/api/cierres?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cierre.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaCierre").value(hasItem(DEFAULT_FECHA_CIERRE.toString())));
    }
    

    @Test
    @Transactional
    public void getCierre() throws Exception {
        // Initialize the database
        cierreRepository.saveAndFlush(cierre);

        // Get the cierre
        restCierreMockMvc.perform(get("/api/cierres/{id}", cierre.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cierre.getId().intValue()))
            .andExpect(jsonPath("$.fechaCierre").value(DEFAULT_FECHA_CIERRE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingCierre() throws Exception {
        // Get the cierre
        restCierreMockMvc.perform(get("/api/cierres/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCierre() throws Exception {
        // Initialize the database
        cierreRepository.saveAndFlush(cierre);

        int databaseSizeBeforeUpdate = cierreRepository.findAll().size();

        // Update the cierre
        Cierre updatedCierre = cierreRepository.findById(cierre.getId()).get();
        // Disconnect from session so that the updates on updatedCierre are not directly saved in db
        em.detach(updatedCierre);
        updatedCierre
            .fechaCierre(UPDATED_FECHA_CIERRE);

        restCierreMockMvc.perform(put("/api/cierres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCierre)))
            .andExpect(status().isOk());

        // Validate the Cierre in the database
        List<Cierre> cierreList = cierreRepository.findAll();
        assertThat(cierreList).hasSize(databaseSizeBeforeUpdate);
        Cierre testCierre = cierreList.get(cierreList.size() - 1);
        assertThat(testCierre.getFechaCierre()).isEqualTo(UPDATED_FECHA_CIERRE);
    }

    @Test
    @Transactional
    public void updateNonExistingCierre() throws Exception {
        int databaseSizeBeforeUpdate = cierreRepository.findAll().size();

        // Create the Cierre

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCierreMockMvc.perform(put("/api/cierres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cierre)))
            .andExpect(status().isBadRequest());

        // Validate the Cierre in the database
        List<Cierre> cierreList = cierreRepository.findAll();
        assertThat(cierreList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCierre() throws Exception {
        // Initialize the database
        cierreRepository.saveAndFlush(cierre);

        int databaseSizeBeforeDelete = cierreRepository.findAll().size();

        // Get the cierre
        restCierreMockMvc.perform(delete("/api/cierres/{id}", cierre.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Cierre> cierreList = cierreRepository.findAll();
        assertThat(cierreList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Cierre.class);
        Cierre cierre1 = new Cierre();
        cierre1.setId(1L);
        Cierre cierre2 = new Cierre();
        cierre2.setId(cierre1.getId());
        assertThat(cierre1).isEqualTo(cierre2);
        cierre2.setId(2L);
        assertThat(cierre1).isNotEqualTo(cierre2);
        cierre1.setId(null);
        assertThat(cierre1).isNotEqualTo(cierre2);
    }
}
