package es.imserso.techfile.web.rest;

import es.imserso.techfile.TechfileApp;

import es.imserso.techfile.domain.ErrorRegistro;
import es.imserso.techfile.repository.ErrorRegistroRepository;
import es.imserso.techfile.service.ErrorRegistroService;
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

/**
 * Test class for the ErrorRegistroResource REST controller.
 *
 * @see ErrorRegistroResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TechfileApp.class)
public class ErrorRegistroResourceIntTest {

    private static final Long DEFAULT_NUMERO_LINEA = 1L;
    private static final Long UPDATED_NUMERO_LINEA = 2L;

    private static final String DEFAULT_TEXTO_LINEA = "AAAAAAAAAA";
    private static final String UPDATED_TEXTO_LINEA = "BBBBBBBBBB";

    @Autowired
    private ErrorRegistroRepository errorRegistroRepository;

    

    @Autowired
    private ErrorRegistroService errorRegistroService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restErrorRegistroMockMvc;

    private ErrorRegistro errorRegistro;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ErrorRegistroResource errorRegistroResource = new ErrorRegistroResource(errorRegistroService);
        this.restErrorRegistroMockMvc = MockMvcBuilders.standaloneSetup(errorRegistroResource)
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
    public static ErrorRegistro createEntity(EntityManager em) {
        ErrorRegistro errorRegistro = new ErrorRegistro()
            .numeroLinea(DEFAULT_NUMERO_LINEA)
            .textoLinea(DEFAULT_TEXTO_LINEA);
        return errorRegistro;
    }

    @Before
    public void initTest() {
        errorRegistro = createEntity(em);
    }

    @Test
    @Transactional
    public void createErrorRegistro() throws Exception {
        int databaseSizeBeforeCreate = errorRegistroRepository.findAll().size();

        // Create the ErrorRegistro
        restErrorRegistroMockMvc.perform(post("/api/error-registros")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(errorRegistro)))
            .andExpect(status().isCreated());

        // Validate the ErrorRegistro in the database
        List<ErrorRegistro> errorRegistroList = errorRegistroRepository.findAll();
        assertThat(errorRegistroList).hasSize(databaseSizeBeforeCreate + 1);
        ErrorRegistro testErrorRegistro = errorRegistroList.get(errorRegistroList.size() - 1);
        assertThat(testErrorRegistro.getNumeroLinea()).isEqualTo(DEFAULT_NUMERO_LINEA);
        assertThat(testErrorRegistro.getTextoLinea()).isEqualTo(DEFAULT_TEXTO_LINEA);
    }

    @Test
    @Transactional
    public void createErrorRegistroWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = errorRegistroRepository.findAll().size();

        // Create the ErrorRegistro with an existing ID
        errorRegistro.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restErrorRegistroMockMvc.perform(post("/api/error-registros")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(errorRegistro)))
            .andExpect(status().isBadRequest());

        // Validate the ErrorRegistro in the database
        List<ErrorRegistro> errorRegistroList = errorRegistroRepository.findAll();
        assertThat(errorRegistroList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllErrorRegistros() throws Exception {
        // Initialize the database
        errorRegistroRepository.saveAndFlush(errorRegistro);

        // Get all the errorRegistroList
        restErrorRegistroMockMvc.perform(get("/api/error-registros?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(errorRegistro.getId().intValue())))
            .andExpect(jsonPath("$.[*].numeroLinea").value(hasItem(DEFAULT_NUMERO_LINEA.intValue())))
            .andExpect(jsonPath("$.[*].textoLinea").value(hasItem(DEFAULT_TEXTO_LINEA.toString())));
    }
    

    @Test
    @Transactional
    public void getErrorRegistro() throws Exception {
        // Initialize the database
        errorRegistroRepository.saveAndFlush(errorRegistro);

        // Get the errorRegistro
        restErrorRegistroMockMvc.perform(get("/api/error-registros/{id}", errorRegistro.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(errorRegistro.getId().intValue()))
            .andExpect(jsonPath("$.numeroLinea").value(DEFAULT_NUMERO_LINEA.intValue()))
            .andExpect(jsonPath("$.textoLinea").value(DEFAULT_TEXTO_LINEA.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingErrorRegistro() throws Exception {
        // Get the errorRegistro
        restErrorRegistroMockMvc.perform(get("/api/error-registros/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateErrorRegistro() throws Exception {
        // Initialize the database
        errorRegistroService.save(errorRegistro);

        int databaseSizeBeforeUpdate = errorRegistroRepository.findAll().size();

        // Update the errorRegistro
        ErrorRegistro updatedErrorRegistro = errorRegistroRepository.findById(errorRegistro.getId()).get();
        // Disconnect from session so that the updates on updatedErrorRegistro are not directly saved in db
        em.detach(updatedErrorRegistro);
        updatedErrorRegistro
            .numeroLinea(UPDATED_NUMERO_LINEA)
            .textoLinea(UPDATED_TEXTO_LINEA);

        restErrorRegistroMockMvc.perform(put("/api/error-registros")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedErrorRegistro)))
            .andExpect(status().isOk());

        // Validate the ErrorRegistro in the database
        List<ErrorRegistro> errorRegistroList = errorRegistroRepository.findAll();
        assertThat(errorRegistroList).hasSize(databaseSizeBeforeUpdate);
        ErrorRegistro testErrorRegistro = errorRegistroList.get(errorRegistroList.size() - 1);
        assertThat(testErrorRegistro.getNumeroLinea()).isEqualTo(UPDATED_NUMERO_LINEA);
        assertThat(testErrorRegistro.getTextoLinea()).isEqualTo(UPDATED_TEXTO_LINEA);
    }

    @Test
    @Transactional
    public void updateNonExistingErrorRegistro() throws Exception {
        int databaseSizeBeforeUpdate = errorRegistroRepository.findAll().size();

        // Create the ErrorRegistro

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restErrorRegistroMockMvc.perform(put("/api/error-registros")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(errorRegistro)))
            .andExpect(status().isBadRequest());

        // Validate the ErrorRegistro in the database
        List<ErrorRegistro> errorRegistroList = errorRegistroRepository.findAll();
        assertThat(errorRegistroList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteErrorRegistro() throws Exception {
        // Initialize the database
        errorRegistroService.save(errorRegistro);

        int databaseSizeBeforeDelete = errorRegistroRepository.findAll().size();

        // Get the errorRegistro
        restErrorRegistroMockMvc.perform(delete("/api/error-registros/{id}", errorRegistro.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ErrorRegistro> errorRegistroList = errorRegistroRepository.findAll();
        assertThat(errorRegistroList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ErrorRegistro.class);
        ErrorRegistro errorRegistro1 = new ErrorRegistro();
        errorRegistro1.setId(1L);
        ErrorRegistro errorRegistro2 = new ErrorRegistro();
        errorRegistro2.setId(errorRegistro1.getId());
        assertThat(errorRegistro1).isEqualTo(errorRegistro2);
        errorRegistro2.setId(2L);
        assertThat(errorRegistro1).isNotEqualTo(errorRegistro2);
        errorRegistro1.setId(null);
        assertThat(errorRegistro1).isNotEqualTo(errorRegistro2);
    }
}
