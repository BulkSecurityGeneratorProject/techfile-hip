package es.imserso.techfile.repository;

import es.imserso.techfile.domain.Pensionista;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Pensionista entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PensionistaRepository extends JpaRepository<Pensionista, Long> {

}
