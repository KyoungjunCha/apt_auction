package com.lhs.sbb;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping()
public class MainController {
    
    @GetMapping("/index")
    public String index() {
        return "index_intro";
    }

    @GetMapping("/index1")
    public String index_1() {
        return "index1";
    }

    @GetMapping("/index2")
    public String index2() {
        return "index2";
    }

    @GetMapping("/index3")
    public String index3() {
        return "index3";
    }

    @GetMapping("/")
    public String root() {
        return "redirect:/index3";
    }

}