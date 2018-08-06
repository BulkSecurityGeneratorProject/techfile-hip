package es.imserso.techfile.service;

import es.imserso.techfile.domain.Proceso;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Proceso.
 */
public interface ProcesoService {

    /**
     * Save a proceso.
     *
     * @param proceso the entity to save
     * @return the persisted entity
     */
    Proceso save(Proceso proceso);

    /**
     * Get all the procesos.
     *
     * @return the list of entities
     */
    List<Proceso> findAll();


    /**
     * Get the "id" proceso.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Proceso> findOne(Long id);

    /**
     * Delete the "id" proceso.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
