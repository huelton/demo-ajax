package com.huelton.demoajax.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.huelton.demoajax.domain.Promocao;

public interface PromocaoRepository extends JpaRepository<Promocao, Long>{
	
}
