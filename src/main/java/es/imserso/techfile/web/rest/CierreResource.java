package es.imserso.techfile.web.rest;

import com.codahale.metrics.annotation.Timed;
import es.imserso.techfile.domain.Cierre;
import es.imserso.techfile.repository.CierreRepository;
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
 * REST controller for managing Cierre.
 */
@RestController
@RequestMapping("/api")
public class CierreResource {

    private final Logger log = LoggerFactory.getLogger(CierreResource.class);

    private static final String ENTITY_NAME = "cierre";

    private final CierreRepository cierreRepository;

    public CierreResource(CierreRepository cierreRepository) {
        this.cierreRepository = cierreRepository;
    }

    /**
     * POST  /cierres : Create a new cierre.
     *
     * @param cierre the cierre to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cierre, or with status 400 (Bad Request) if the cierre has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cierres")
    @Timed
    public ResponseEntity<Cierre> createCierre(@Valid @RequestBody Cierre cierre) throws URISyntaxException {
        log.debug("REST request to save Cierre : {}", cierre);
        if (cierre.getId() != null) {
            throw new BadRequestAlertException("A new cierre cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Cierre result = cierreRepository.save(cierre);
        return ResponseEntity.created(new URI("/api/cierres/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cierres : Updates an existing cierre.
     *
     * @param cierre the cierre to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cierre,
     * or with status 400 (Bad Request) if the cierre is not valid,
     * or with status 500 (Internal Server Error) if the cierre couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cierres")
    @Timed
    public ResponseEntity<Cierre> updateCierre(@Valid @RequestBody Cierre cierre) throws URISyntaxException {
        log.debug("REST request to update Cierre : {}", cierre);
        if (cierre.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Cierre result = cierreRepository.save(cierre);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cierre.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cierres : get all the cierres.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of cierres in body
     */
    @GetMapping("/cierres")
    @Timed
    public ResponseEntity<List<Cierre>> getAllCierres(Pageable pageable) {
        log.debug("REST request to get a page of Cierres");
        Page<Cierre> page = cierreRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/cierres");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /cierres/:id : get the "id" cierre.
     *
     * @param id the id of the cierre to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cierre, or with status 404 (Not Found)
     */
    @GetMapping("/cierres/{id}")
    @Timed
    public ResponseEntity<Cierre> getCierre(@PathVariable Long id) {
        log.debug("REST request to get Cierre : {}", id);
        Optional<Cierre> cierre = cierreRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cierre);
    }

    /**
     * DELETE  /cierres/:id : delete the "id" cierre.
     *
     * @param id the id of the cierre to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cierres/{id}")
    @Timed
    public ResponseEntity<Void> deleteCierre(@PathVariable Long id) {
        log.debug("REST request to delete Cierre : {}", id);

        cierreRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
