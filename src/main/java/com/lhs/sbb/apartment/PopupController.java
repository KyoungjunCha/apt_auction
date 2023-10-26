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
@RequestMapping()
public class PopupController {

    // @RequestMapping("/popup")
    // public String showPopup() {
    //     return "popup"; // 이렇게 리턴하면 "popup.html" 페이지로 이동합니다.
    // }

}
