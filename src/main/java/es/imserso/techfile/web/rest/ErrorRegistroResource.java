package es.imserso.techfile.web.rest;

import com.codahale.metrics.annotation.Timed;
import es.imserso.techfile.domain.ErrorRegistro;
import es.imserso.techfile.service.ErrorRegistroService;
import es.imserso.techfile.web.rest.errors.BadRequestAlertException;
import es.imserso.techfile.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ErrorRegistro.
 */
@RestController
@RequestMapping("/api")
public class ErrorRegistroResource {

    private final Logger log = LoggerFactory.getLogger(ErrorRegistroResource.class);

    private static final String ENTITY_NAME = "errorRegistro";

    private final ErrorRegistroService errorRegistroService;

    public ErrorRegistroResource(ErrorRegistroService errorRegistroService) {
        this.errorRegistroService = errorRegistroService;
    }

    /**
     * POST  /error-registros : Create a new errorRegistro.
     *
     * @param errorRegistro the errorRegistro to create
     * @return the ResponseEntity with status 201 (Created) and with body the new errorRegistro, or with status 400 (Bad Request) if the errorRegistro has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/error-registros")
    @Timed
    public ResponseEntity<ErrorRegistro> createErrorRegistro(@RequestBody ErrorRegistro errorRegistro) throws URISyntaxException {
        log.debug("REST request to save ErrorRegistro : {}", errorRegistro);
        if (errorRegistro.getId() != null) {
            throw new BadRequestAlertException("A new errorRegistro cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ErrorRegistro result = errorRegistroService.save(errorRegistro);
        return ResponseEntity.created(new URI("/api/error-registros/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /error-registros : Updates an existing errorRegistro.
     *
     * @param errorRegistro the errorRegistro to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated errorRegistro,
     * or with status 400 (Bad Request) if the errorRegistro is not valid,
     * or with status 500 (Internal Server Error) if the errorRegistro couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/error-registros")
    @Timed
    public ResponseEntity<ErrorRegistro> updateErrorRegistro(@RequestBody ErrorRegistro errorRegistro) throws URISyntaxException {
        log.debug("REST request to update ErrorRegistro : {}", errorRegistro);
        if (errorRegistro.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ErrorRegistro result = errorRegistroService.save(errorRegistro);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, errorRegistro.getId().toString()))
            .body(result);
    }

    /**
     * GET  /error-registros : get all the errorRegistros.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of errorRegistros in body
     */
    @GetMapping("/error-registros")
    @Timed
    public List<ErrorRegistro> getAllErrorRegistros() {
        log.debug("REST request to get all ErrorRegistros");
        return errorRegistroService.findAll();
    }

    /**
     * GET  /error-registros/:id : get the "id" errorRegistro.
     *
     * @param id the id of the errorRegistro to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the errorRegistro, or with status 404 (Not Found)
     */
    @GetMapping("/error-registros/{id}")
    @Timed
    public ResponseEntity<ErrorRegistro> getErrorRegistro(@PathVariable Long id) {
        log.debug("REST request to get ErrorRegistro : {}", id);
        Optional<ErrorRegistro> errorRegistro = errorRegistroService.findOne(id);
        return ResponseUtil.wrapOrNotFound(errorRegistro);
    }

    /**
     * DELETE  /error-registros/:id : delete the "id" errorRegistro.
     *
     * @param id the id of the errorRegistro to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/error-registros/{id}")
    @Timed
    public ResponseEntity<Void> deleteErrorRegistro(@PathVariable Long id) {
        log.debug("REST request to delete ErrorRegistro : {}", id);
        errorRegistroService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
