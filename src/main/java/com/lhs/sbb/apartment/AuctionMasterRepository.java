package com.lhs.sbb.apartment;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

// import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AuctionMasterRepository extends JpaRepository<AuctionMaster, String> {
    // Optional<Apartment> findByauctionkey(String auctionkey);
    AuctionMaster findByAuctionKey(String auctionKey);
    
    // 낙찰가를 범위로 지정하여 값을 list 에 넣음.
    List<AuctionMaster> findByHammerPriceBetween(Long startRange, Long endRange);

    // 예측낙찰가를 범위로 지정하여 값을 list 에 넣음.
    List<AuctionMaster> findByPredictionPriceBetween(Long startRange, Long endRange);
}
