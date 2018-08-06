package es.imserso.techfile.service.impl;

import es.imserso.techfile.service.MesService;
import es.imserso.techfile.domain.Mes;
import es.imserso.techfile.repository.MesRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;
/**
 * Service Implementation for managing Mes.
 */
@Service
@Transactional
public class MesServiceImpl implements MesService {

    private final Logger log = LoggerFactory.getLogger(MesServiceImpl.class);

    private final MesRepository mesRepository;

    public MesServiceImpl(MesRepository mesRepository) {
        this.mesRepository = mesRepository;
    }

    /**
     * Save a mes.
     *
     * @param mes the entity to save
     * @return the persisted entity
     */
    @Override
    public Mes save(Mes mes) {
        log.debug("Request to save Mes : {}", mes);        return mesRepository.save(mes);
    }

    /**
     * Get all the mes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Mes> findAll(Pageable pageable) {
        log.debug("Request to get all Mes");
        return mesRepository.findAll(pageable);
    }


    /**
     * Get one mes by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Mes> findOne(Long id) {
        log.debug("Request to get Mes : {}", id);
        return mesRepository.findById(id);
    }

    /**
     * Delete the mes by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Mes : {}", id);
        mesRepository.deleteById(id);
    }
}
