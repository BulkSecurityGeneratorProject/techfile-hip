package es.imserso.techfile.service;

import es.imserso.techfile.domain.Fichero;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Fichero.
 */
public interface FicheroService {

    /**
     * Save a fichero.
     *
     * @param fichero the entity to save
     * @return the persisted entity
     */
    Fichero save(Fichero fichero);

    /**
     * Get all the ficheroes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Fichero> findAll(Pageable pageable);


    /**
     * Get the "id" fichero.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Fichero> findOne(Long id);

    /**
     * Delete the "id" fichero.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
