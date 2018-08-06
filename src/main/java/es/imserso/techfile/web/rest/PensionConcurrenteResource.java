package es.imserso.techfile.web.rest;

import com.codahale.metrics.annotation.Timed;
import es.imserso.techfile.domain.PensionConcurrente;
import es.imserso.techfile.repository.PensionConcurrenteRepository;
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

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing PensionConcurrente.
 */
@RestController
@RequestMapping("/api")
public class PensionConcurrenteResource {

    private final Logger log = LoggerFactory.getLogger(PensionConcurrenteResource.class);

    private static final String ENTITY_NAME = "pensionConcurrente";

    private final PensionConcurrenteRepository pensionConcurrenteRepository;

    public PensionConcurrenteResource(PensionConcurrenteRepository pensionConcurrenteRepository) {
        this.pensionConcurrenteRepository = pensionConcurrenteRepository;
    }

    /**
     * POST  /pension-concurrentes : Create a new pensionConcurrente.
     *
     * @param pensionConcurrente the pensionConcurrente to create
     * @return the ResponseEntity with status 201 (Created) and with body the new pensionConcurrente, or with status 400 (Bad Request) if the pensionConcurrente has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/pension-concurrentes")
    @Timed
    public ResponseEntity<PensionConcurrente> createPensionConcurrente(@Valid @RequestBody PensionConcurrente pensionConcurrente) throws URISyntaxException {
        log.debug("REST request to save PensionConcurrente : {}", pensionConcurrente);
        if (pensionConcurrente.getId() != null) {
            throw new BadRequestAlertException("A new pensionConcurrente cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PensionConcurrente result = pensionConcurrenteRepository.save(pensionConcurrente);
        return ResponseEntity.created(new URI("/api/pension-concurrentes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /pension-concurrentes : Updates an existing pensionConcurrente.
     *
     * @param pensionConcurrente the pensionConcurrente to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated pensionConcurrente,
     * or with status 400 (Bad Request) if the pensionConcurrente is not valid,
     * or with status 500 (Internal Server Error) if the pensionConcurrente couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/pension-concurrentes")
    @Timed
    public ResponseEntity<PensionConcurrente> updatePensionConcurrente(@Valid @RequestBody PensionConcurrente pensionConcurrente) throws URISyntaxException {
        log.debug("REST request to update PensionConcurrente : {}", pensionConcurrente);
        if (pensionConcurrente.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PensionConcurrente result = pensionConcurrenteRepository.save(pensionConcurrente);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, pensionConcurrente.getId().toString()))
            .body(result);
    }

    /**
     * GET  /pension-concurrentes : get all the pensionConcurrentes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of pensionConcurrentes in body
     */
    @GetMapping("/pension-concurrentes")
    @Timed
    public ResponseEntity<List<PensionConcurrente>> getAllPensionConcurrentes(Pageable pageable) {
        log.debug("REST request to get a page of PensionConcurrentes");
        Page<PensionConcurrente> page = pensionConcurrenteRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/pension-concurrentes");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /pension-concurrentes/:id : get the "id" pensionConcurrente.
     *
     * @param id the id of the pensionConcurrente to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the pensionConcurrente, or with status 404 (Not Found)
     */
    @GetMapping("/pension-concurrentes/{id}")
    @Timed
    public ResponseEntity<PensionConcurrente> getPensionConcurrente(@PathVariable Long id) {
        log.debug("REST request to get PensionConcurrente : {}", id);
        Optional<PensionConcurrente> pensionConcurrente = pensionConcurrenteRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(pensionConcurrente);
    }

    /**
     * DELETE  /pension-concurrentes/:id : delete the "id" pensionConcurrente.
     *
     * @param id the id of the pensionConcurrente to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/pension-concurrentes/{id}")
    @Timed
    public ResponseEntity<Void> deletePensionConcurrente(@PathVariable Long id) {
        log.debug("REST request to delete PensionConcurrente : {}", id);

        pensionConcurrenteRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
