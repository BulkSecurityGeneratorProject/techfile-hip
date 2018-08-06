package es.imserso.techfile.web.rest;

import com.codahale.metrics.annotation.Timed;
import es.imserso.techfile.domain.TipoError;
import es.imserso.techfile.repository.TipoErrorRepository;
import es.imserso.techfile.web.rest.errors.BadRequestAlertException;
import es.imserso.techfile.web.rest.util.HeaderUtil;
import es.imserso.techfile.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing TipoError.
 */
@RestController
@RequestMapping("/api")
public class TipoErrorResource {

    private final Logger log = LoggerFactory.getLogger(TipoErrorResource.class);

    private static final String ENTITY_NAME = "tipoError";

    private final TipoErrorRepository tipoErrorRepository;

    public TipoErrorResource(TipoErrorRepository tipoErrorRepository) {
        this.tipoErrorRepository = tipoErrorRepository;
    }

    /**
     * POST  /tipo-errors : Create a new tipoError.
     *
     * @param tipoError the tipoError to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tipoError, or with status 400 (Bad Request) if the tipoError has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tipo-errors")
    @Timed
    public ResponseEntity<TipoError> createTipoError(@RequestBody TipoError tipoError) throws URISyntaxException {
        log.debug("REST request to save TipoError : {}", tipoError);
        if (tipoError.getId() != null) {
            throw new BadRequestAlertException("A new tipoError cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoError result = tipoErrorRepository.save(tipoError);
        return ResponseEntity.created(new URI("/api/tipo-errors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tipo-errors : Updates an existing tipoError.
     *
     * @param tipoError the tipoError to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tipoError,
     * or with status 400 (Bad Request) if the tipoError is not valid,
     * or with status 500 (Internal Server Error) if the tipoError couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tipo-errors")
    @Timed
    public ResponseEntity<TipoError> updateTipoError(@RequestBody TipoError tipoError) throws URISyntaxException {
        log.debug("REST request to update TipoError : {}", tipoError);
        if (tipoError.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TipoError result = tipoErrorRepository.save(tipoError);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tipoError.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tipo-errors : get all the tipoErrors.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of tipoErrors in body
     */
    @GetMapping("/tipo-errors")
    @Timed
    public ResponseEntity<List<TipoError>> getAllTipoErrors(Pageable pageable) {
        log.debug("REST request to get a page of TipoErrors");
        Page<TipoError> page = tipoErrorRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/tipo-errors");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /tipo-errors/:id : get the "id" tipoError.
     *
     * @param id the id of the tipoError to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tipoError, or with status 404 (Not Found)
     */
    @GetMapping("/tipo-errors/{id}")
    @Timed
    public ResponseEntity<TipoError> getTipoError(@PathVariable Long id) {
        log.debug("REST request to get TipoError : {}", id);
        Optional<TipoError> tipoError = tipoErrorRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tipoError);
    }

    /**
     * DELETE  /tipo-errors/:id : delete the "id" tipoError.
     *
     * @param id the id of the tipoError to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tipo-errors/{id}")
    @Timed
    public ResponseEntity<Void> deleteTipoError(@PathVariable Long id) {
        log.debug("REST request to delete TipoError : {}", id);

        tipoErrorRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
