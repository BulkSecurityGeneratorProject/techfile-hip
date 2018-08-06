package es.imserso.techfile.service.impl;

import es.imserso.techfile.service.ProcesoService;
import es.imserso.techfile.domain.Proceso;
import es.imserso.techfile.repository.ProcesoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;
/**
 * Service Implementation for managing Proceso.
 */
@Service
@Transactional
public class ProcesoServiceImpl implements ProcesoService {

    private final Logger log = LoggerFactory.getLogger(ProcesoServiceImpl.class);

    private final ProcesoRepository procesoRepository;

    public ProcesoServiceImpl(ProcesoRepository procesoRepository) {
        this.procesoRepository = procesoRepository;
    }

    /**
     * Save a proceso.
     *
     * @param proceso the entity to save
     * @return the persisted entity
     */
    @Override
    public Proceso save(Proceso proceso) {
        log.debug("Request to save Proceso : {}", proceso);        return procesoRepository.save(proceso);
    }

    /**
     * Get all the procesos.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Proceso> findAll() {
        log.debug("Request to get all Procesos");
        return procesoRepository.findAll();
    }


    /**
     * Get one proceso by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Proceso> findOne(Long id) {
        log.debug("Request to get Proceso : {}", id);
        return procesoRepository.findById(id);
    }

    /**
     * Delete the proceso by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Proceso : {}", id);
        procesoRepository.deleteById(id);
    }
}
