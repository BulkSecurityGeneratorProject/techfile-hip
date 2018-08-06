package es.imserso.techfile.web.rest;

import com.codahale.metrics.annotation.Timed;
import es.imserso.techfile.domain.Proceso;
import es.imserso.techfile.service.ProcesoService;
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
 * REST controller for managing Proceso.
 */
@RestController
@RequestMapping("/api")
public class ProcesoResource {

    private final Logger log = LoggerFactory.getLogger(ProcesoResource.class);

    private static final String ENTITY_NAME = "proceso";

    private final ProcesoService procesoService;

    public ProcesoResource(ProcesoService procesoService) {
        this.procesoService = procesoService;
    }

    /**
     * POST  /procesos : Create a new proceso.
     *
     * @param proceso the proceso to create
     * @return the ResponseEntity with status 201 (Created) and with body the new proceso, or with status 400 (Bad Request) if the proceso has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/procesos")
    @Timed
    public ResponseEntity<Proceso> createProceso(@RequestBody Proceso proceso) throws URISyntaxException {
        log.debug("REST request to save Proceso : {}", proceso);
        if (proceso.getId() != null) {
            throw new BadRequestAlertException("A new proceso cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Proceso result = procesoService.save(proceso);
        return ResponseEntity.created(new URI("/api/procesos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /procesos : Updates an existing proceso.
     *
     * @param proceso the proceso to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated proceso,
     * or with status 400 (Bad Request) if the proceso is not valid,
     * or with status 500 (Internal Server Error) if the proceso couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/procesos")
    @Timed
    public ResponseEntity<Proceso> updateProceso(@RequestBody Proceso proceso) throws URISyntaxException {
        log.debug("REST request to update Proceso : {}", proceso);
        if (proceso.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Proceso result = procesoService.save(proceso);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, proceso.getId().toString()))
            .body(result);
    }

    /**
     * GET  /procesos : get all the procesos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of procesos in body
     */
    @GetMapping("/procesos")
    @Timed
    public List<Proceso> getAllProcesos() {
        log.debug("REST request to get all Procesos");
        return procesoService.findAll();
    }

    /**
     * GET  /procesos/:id : get the "id" proceso.
     *
     * @param id the id of the proceso to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the proceso, or with status 404 (Not Found)
     */
    @GetMapping("/procesos/{id}")
    @Timed
    public ResponseEntity<Proceso> getProceso(@PathVariable Long id) {
        log.debug("REST request to get Proceso : {}", id);
        Optional<Proceso> proceso = procesoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(proceso);
    }

    /**
     * DELETE  /procesos/:id : delete the "id" proceso.
     *
     * @param id the id of the proceso to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/procesos/{id}")
    @Timed
    public ResponseEntity<Void> deleteProceso(@PathVariable Long id) {
        log.debug("REST request to delete Proceso : {}", id);
        procesoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
