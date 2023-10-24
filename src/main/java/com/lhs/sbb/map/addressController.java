package com.lhs.sbb.map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class addressController {
    @GetMapping("/address")
    public String address(){
        System.out.println("카카오 맵 api test");
        return "map_form";
    }
}

    
