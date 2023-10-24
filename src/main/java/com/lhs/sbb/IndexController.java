package com.lhs.sbb;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.ui.Model;

@Controller
public class IndexController {

    // 인덱스에서 값 넣어서 맵으로 돌려주기
    // @PostMapping("/map/list")
    // public String index3(@RequestParam("price") Integer price, @RequestParam("locationsDo") String locationsDo,
    //        @RequestParam("locationsSi") String locationsSi, @RequestParam("square") Integer square,Model m) {
    //     m.addAttribute("price", price);
    //     m.addAttribute("locationsDo", locationsDo);
    //     m.addAttribute("locationsSi", locationsSi);
    //     m.addAttribute("square", square);
    
    //     return "map_form";
    // }
    
}
