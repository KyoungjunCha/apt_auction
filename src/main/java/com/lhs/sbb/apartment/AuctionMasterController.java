package com.lhs.sbb.apartment;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.RequiredArgsConstructor;

import org.springframework.ui.Model;

// @RequiredArgsConstructor // 생성자 자동 주입
@Controller
@RequestMapping("/auction")
public class AuctionMasterController {

    private final AuctionMasterRepository auctionMasterRepository;
    private final AuctionMasterService auctionMasterService;

    @Autowired
    public AuctionMasterController(AuctionMasterRepository auctionMasterRepository,
            AuctionMasterService auctionMasterService) {
        this.auctionMasterRepository = auctionMasterRepository;
        this.auctionMasterService = auctionMasterService;
    }

    // @GetMapping("/{auctionKey}")
    // public String findByAuctionKey(@PathVariable String auctionKey, Model model) {
    //     AuctionMaster auctionMaster = auctionMasterRepository.findByAuctionKey(auctionKey);
    //     if (auctionMaster != null) {
    //         model.addAttribute("auctionMaster", auctionMaster);
    //     }
    //     return "apartment_detail";
    // }
    // @GetMapping("/{auctionKey}")
    // public String findByAuctionKey(@PathVariable String auctionKey, Model model)
    // {
    // AuctionMaster auctionMaster =
    // auctionMasterRepository.findByAuctionKey(auctionKey);
    // if (auctionMaster != null) {
    // model.addAttribute("auctionMaster", auctionMaster);
    // }
    // return "apartment_form";
    // }


    
    @GetMapping("/list")
    // @ResponseBody
    public String listAllAuctionMasters(Model model) {
    List<AuctionMaster> allAuctionMasters = auctionMasterRepository.findAll();
    model.addAttribute("auctionMasters", allAuctionMasters);



    // 주소 정보 추출 및 타임리프에 추가하기
    List<String> addresses = allAuctionMasters.stream() // 스트림 형식으로 변환
    .map(AuctionMaster::getAddress) // AuctionMaster 에서 주소 추출
    .collect(Collectors.toList()); // 주소정보 List 변환
    model.addAttribute("addresses", addresses);

    return "apartment_form";
    }

    @PostMapping("/list/custom-filters")
    public String listAuctionMastersBasedOnFilters(
            @RequestParam(value = "price", required = false) Long price,
            @RequestParam(value = "addressSido", required = false) String addressSido,
            @RequestParam(value = "apartmentSize", required = false) Integer apartmentSize,

            Model model) {

        // 필터링할 주소 정보를 모두 검색
        List<AuctionMaster> filteredAuctionMasters = auctionMasterService.getAuctionMastersBasedOnFilters(price,
                addressSido, apartmentSize);
        // System.out.println(filteredAuctionMasters);
        // // 필터링된 주소 정보만 추출
        List<String> addresses = filteredAuctionMasters.stream()
                .map(AuctionMaster::getAddress)
                .collect(Collectors.toList());

        // System.out.println("test0");

        // 모델에 필터링된 정보 및 주소 정보를 추가
        model.addAttribute("auctionMasters", filteredAuctionMasters);// 정보 전부
        // System.out.println("test1");

        model.addAttribute("addresses", addresses); // 주소만 추출
        // System.out.println(model.toString());

        model.addAttribute("addressSido", addressSido);

        model.addAttribute("price", price);
        model.addAttribute("apartmentSize", apartmentSize);

        return "map_form";
    }

    // @GetMapping("/apartmentdetail")
    // public String detail(){

    // return "apartment_detail";
    // }

    @GetMapping("/popup")
    public String showPopup(@RequestParam(value = "price", required = false) Long price,
            @RequestParam(value = "apartmentSize", required = false) Integer apartmentSize,
            Model model) {
        if (price == null){
            price = (long)0;
        }
        if (apartmentSize == null){
            apartmentSize = 0;
        }
        // System.out.println("test0:" + price);
        // System.out.println("test1:" + apartmentSize);
        model.addAttribute("price", price);
        model.addAttribute("apartmentSize", apartmentSize);

        return "popup"; // 이렇게 리턴하면 "popup.html" 페이지로 이동합니다.
    }


    @GetMapping("/apartment_detail")
    public String showApartmentDetail(@RequestParam(value = "auctionKey", required = false) String auctionKey, Model model) {
        // auctionKey를 이용하여 해당 아파트의 상세 정보를 데이터베이스에서 가져옵니다.
        // 그리고 이 정보를 모델에 추가하여 템플릿에서 사용할 수 있게 합니다.
        // auctionKey="2021-11663";
        AuctionMaster auctionMaster = auctionMasterRepository.findByAuctionKey(auctionKey);
        model.addAttribute("auctionKey",auctionKey);
        if (auctionMaster != null) {
            model.addAttribute("auctionMaster", auctionMaster);
        }
        
        return "apartment_detail"; // 해당 템플릿으로 이동
    }

    
}
