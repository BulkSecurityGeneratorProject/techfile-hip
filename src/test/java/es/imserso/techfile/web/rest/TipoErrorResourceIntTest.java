package es.imserso.techfile.web.rest;

import es.imserso.techfile.TechfileApp;

import es.imserso.techfile.domain.TipoError;
import es.imserso.techfile.repository.TipoErrorRepository;
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
import java.util.List;


import static es.imserso.techfile.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import es.imserso.techfile.domain.enumeration.NivelError;
/**
 * Test class for the TipoErrorResource REST controller.
 *
 * @see TipoErrorResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TechfileApp.class)
public class TipoErrorResourceIntTest {

    private static final String DEFAULT_CODIGO = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final NivelError DEFAULT_NIVEL = NivelError.FATAL;
    private static final NivelError UPDATED_NIVEL = NivelError.ERROR;

    @Autowired
    private TipoErrorRepository tipoErrorRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTipoErrorMockMvc;

    private TipoError tipoError;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TipoErrorResource tipoErrorResource = new TipoErrorResource(tipoErrorRepository);
        this.restTipoErrorMockMvc = MockMvcBuilders.standaloneSetup(tipoErrorResource)
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
    public static TipoError createEntity(EntityManager em) {
        TipoError tipoError = new TipoError()
            .codigo(DEFAULT_CODIGO)
            .descripcion(DEFAULT_DESCRIPCION)
            .nivel(DEFAULT_NIVEL);
        return tipoError;
    }

    @Before
    public void initTest() {
        tipoError = createEntity(em);
    }

    @Test
    @Transactional
    public void createTipoError() throws Exception {
        int databaseSizeBeforeCreate = tipoErrorRepository.findAll().size();

        // Create the TipoError
        restTipoErrorMockMvc.perform(post("/api/tipo-errors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoError)))
            .andExpect(status().isCreated());

        // Validate the TipoError in the database
        List<TipoError> tipoErrorList = tipoErrorRepository.findAll();
        assertThat(tipoErrorList).hasSize(databaseSizeBeforeCreate + 1);
        TipoError testTipoError = tipoErrorList.get(tipoErrorList.size() - 1);
        assertThat(testTipoError.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testTipoError.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testTipoError.getNivel()).isEqualTo(DEFAULT_NIVEL);
    }

    @Test
    @Transactional
    public void createTipoErrorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tipoErrorRepository.findAll().size();

        // Create the TipoError with an existing ID
        tipoError.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipoErrorMockMvc.perform(post("/api/tipo-errors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoError)))
            .andExpect(status().isBadRequest());

        // Validate the TipoError in the database
        List<TipoError> tipoErrorList = tipoErrorRepository.findAll();
        assertThat(tipoErrorList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTipoErrors() throws Exception {
        // Initialize the database
        tipoErrorRepository.saveAndFlush(tipoError);

        // Get all the tipoErrorList
        restTipoErrorMockMvc.perform(get("/api/tipo-errors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoError.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO.toString())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())))
            .andExpect(jsonPath("$.[*].nivel").value(hasItem(DEFAULT_NIVEL.toString())));
    }
    

    @Test
    @Transactional
    public void getTipoError() throws Exception {
        // Initialize the database
        tipoErrorRepository.saveAndFlush(tipoError);

        // Get the tipoError
        restTipoErrorMockMvc.perform(get("/api/tipo-errors/{id}", tipoError.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tipoError.getId().intValue()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO.toString()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()))
            .andExpect(jsonPath("$.nivel").value(DEFAULT_NIVEL.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingTipoError() throws Exception {
        // Get the tipoError
        restTipoErrorMockMvc.perform(get("/api/tipo-errors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTipoError() throws Exception {
        // Initialize the database
        tipoErrorRepository.saveAndFlush(tipoError);

        int databaseSizeBeforeUpdate = tipoErrorRepository.findAll().size();

        // Update the tipoError
        TipoError updatedTipoError = tipoErrorRepository.findById(tipoError.getId()).get();
        // Disconnect from session so that the updates on updatedTipoError are not directly saved in db
        em.detach(updatedTipoError);
        updatedTipoError
            .codigo(UPDATED_CODIGO)
            .descripcion(UPDATED_DESCRIPCION)
            .nivel(UPDATED_NIVEL);

        restTipoErrorMockMvc.perform(put("/api/tipo-errors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTipoError)))
            .andExpect(status().isOk());

        // Validate the TipoError in the database
        List<TipoError> tipoErrorList = tipoErrorRepository.findAll();
        assertThat(tipoErrorList).hasSize(databaseSizeBeforeUpdate);
        TipoError testTipoError = tipoErrorList.get(tipoErrorList.size() - 1);
        assertThat(testTipoError.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testTipoError.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testTipoError.getNivel()).isEqualTo(UPDATED_NIVEL);
    }

    @Test
    @Transactional
    public void updateNonExistingTipoError() throws Exception {
        int databaseSizeBeforeUpdate = tipoErrorRepository.findAll().size();

        // Create the TipoError

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTipoErrorMockMvc.perform(put("/api/tipo-errors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoError)))
            .andExpect(status().isBadRequest());

        // Validate the TipoError in the database
        List<TipoError> tipoErrorList = tipoErrorRepository.findAll();
        assertThat(tipoErrorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTipoError() throws Exception {
        // Initialize the database
        tipoErrorRepository.saveAndFlush(tipoError);

        int databaseSizeBeforeDelete = tipoErrorRepository.findAll().size();

        // Get the tipoError
        restTipoErrorMockMvc.perform(delete("/api/tipo-errors/{id}", tipoError.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TipoError> tipoErrorList = tipoErrorRepository.findAll();
        assertThat(tipoErrorList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoError.class);
        TipoError tipoError1 = new TipoError();
        tipoError1.setId(1L);
        TipoError tipoError2 = new TipoError();
        tipoError2.setId(tipoError1.getId());
        assertThat(tipoError1).isEqualTo(tipoError2);
        tipoError2.setId(2L);
        assertThat(tipoError1).isNotEqualTo(tipoError2);
        tipoError1.setId(null);
        assertThat(tipoError1).isNotEqualTo(tipoError2);
    }
}
