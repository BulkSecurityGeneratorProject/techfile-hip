package es.imserso.techfile.service;

import es.imserso.techfile.domain.ErrorRegistro;
import es.imserso.techfile.repository.ErrorRegistroRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;
/**
 * Service Implementation for managing ErrorRegistro.
 */
@Service
@Transactional
public class ErrorRegistroService {

    private final Logger log = LoggerFactory.getLogger(ErrorRegistroService.class);

    private final ErrorRegistroRepository errorRegistroRepository;

    public ErrorRegistroService(ErrorRegistroRepository errorRegistroRepository) {
        this.errorRegistroRepository = errorRegistroRepository;
    }

    /**
     * Save a errorRegistro.
     *
     * @param errorRegistro the entity to save
     * @return the persisted entity
     */
    public ErrorRegistro save(ErrorRegistro errorRegistro) {
        log.debug("Request to save ErrorRegistro : {}", errorRegistro);        return errorRegistroRepository.save(errorRegistro);
    }

    /**
     * Get all the errorRegistros.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<ErrorRegistro> findAll() {
        log.debug("Request to get all ErrorRegistros");
        return errorRegistroRepository.findAll();
    }


    /**
     * Get one errorRegistro by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<ErrorRegistro> findOne(Long id) {
        log.debug("Request to get ErrorRegistro : {}", id);
        return errorRegistroRepository.findById(id);
    }

    /**
     * Delete the errorRegistro by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete ErrorRegistro : {}", id);
        errorRegistroRepository.deleteById(id);
    }
}
