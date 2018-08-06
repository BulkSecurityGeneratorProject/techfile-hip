package es.imserso.techfile.service;

import es.imserso.techfile.domain.Pensionista;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Pensionista.
 */
public interface PensionistaService {

    /**
     * Save a pensionista.
     *
     * @param pensionista the entity to save
     * @return the persisted entity
     */
    Pensionista save(Pensionista pensionista);

    /**
     * Get all the pensionistas.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Pensionista> findAll(Pageable pageable);


    /**
     * Get the "id" pensionista.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Pensionista> findOne(Long id);

    /**
     * Delete the "id" pensionista.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
