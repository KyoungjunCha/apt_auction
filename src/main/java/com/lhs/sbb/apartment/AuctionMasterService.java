package com.lhs.sbb.apartment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AuctionMasterService {
    private final AuctionMasterRepository auctionMasterRepository;

    @Autowired
    public AuctionMasterService(AuctionMasterRepository auctionMasterRepository) {
        this.auctionMasterRepository = auctionMasterRepository;
    }

    public List<AuctionMaster> getAuctionMastersBasedOnFilters(Long price, String addressSido, Integer apartmentSize) {
        // 가격 범위 설정
        Long startRange = (price / 100_000_000) * 100_000_000;
        Long endRange = startRange + 99_999_999;

        List<AuctionMaster> byPriceRange = auctionMasterRepository.findByHammerPriceBetween(startRange, endRange);
        // System.out.println(byPriceRange);

        // 필터링된 주소 정보를 저장할 리스트
        List<AuctionMaster> filteredAuctionMasters = new ArrayList<>();

        // 가격으로 필터링된 주소 정보에 대해 추가 필터링
        for (AuctionMaster auctionMaster : byPriceRange) {
            boolean isMatch = true; // 초기 상태는 모든 필터에 부합하는 것으로 가정

            // 평수 필터를 적용
            if (apartmentSize != null && auctionMaster.getApartmentSize() != null) {
                isMatch = isMatch && auctionMaster.getApartmentSize() >= (apartmentSize - 3) && auctionMaster.getApartmentSize() <= (apartmentSize + 3);
            }
            
            // 지역 필터를 적용
            if (addressSido != null && !addressSido.isEmpty()) {
                isMatch = isMatch && auctionMaster.getAddressSido().equals(addressSido);
            }

            // 모든 필터에 부합하는 경우만 필터링된 리스트에 추가
            if (isMatch) {
                filteredAuctionMasters.add(auctionMaster);
            }
        }

        return filteredAuctionMasters;
    }
}
