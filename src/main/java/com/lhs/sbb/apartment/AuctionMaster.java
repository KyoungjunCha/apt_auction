package com.lhs.sbb.apartment;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class AuctionMaster {
    @Id
    private String auctionKey;

    // private Long claimPrice; //경매 신청인의 청구금액
    private String appraisalDate; //감정일자
    // private Integer auctionCount; //총경매횟수
    private Integer auctionMiscarriageCount; //총유찰횟수
    private Long totalAppraisalPrice; //총감정가
    private Long minimumSalesPrice; //최저매각가격
    private String firstAuctionDate; //최초경매일
    private String finalAuctionDate; //최종경매일
    // private String finalResult; //최종결과
    private String buildDate; //준공일
    private String addressSido; //주소_시도
    private String address; //풀주소
    // private String apartmentUsage; //아파트 용도
    // private String preserveRegistDate; //보존등기일
    private Integer totalFloor; //총층수
    private Integer currentFloor; //현재층수
    // private String specific; //기타특이사항
    private String roadName; //도로명주소 _ 도로명
    private Integer apartmentSize; //아파트 평수
    private Integer viewCount; //조회수
    private double vicinityRate; //인근 아파트 경매 낙찰 비율
    // private String closeDate; //종국일자
    // private String closeResult; //종국결과
    private Long realPrice; //실거래가
    private Long predictionPrice; //예측가
    private Long hammerPrice; //낙찰가

}
