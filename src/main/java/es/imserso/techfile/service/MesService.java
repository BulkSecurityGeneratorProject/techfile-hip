package es.imserso.techfile.service;

import es.imserso.techfile.domain.Mes;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Mes.
 */
public interface MesService {

    /**
     * Save a mes.
     *
     * @param mes the entity to save
     * @return the persisted entity
     */
    Mes save(Mes mes);

    /**
     * Get all the mes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Mes> findAll(Pageable pageable);


    /**
     * Get the "id" mes.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Mes> findOne(Long id);

    /**
     * Delete the "id" mes.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
