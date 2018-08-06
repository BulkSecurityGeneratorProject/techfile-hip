package es.imserso.techfile.repository;

import es.imserso.techfile.domain.Cierre;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Cierre entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CierreRepository extends JpaRepository<Cierre, Long> {

}
