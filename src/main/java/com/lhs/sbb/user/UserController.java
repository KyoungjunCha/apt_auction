package com.lhs.sbb.user;

import jakarta.validation.Valid;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @GetMapping("/login")
    public String login() {
        return "index3";
    }   
    

    @GetMapping("/signup")
    public String signup(UserCreateForm userCreateForm) {
        return "/signup/signup_form";
    }


    @PostMapping("/signup") //request mappting 된 /user/signup 을기준으로 post 값이 입력되면
    public String signup(@Valid UserCreateForm userCreateForm, BindingResult bindingResult) { //@valid 폼으로 부터 받은 객체를 검증 BindingResult 검증 결과를 저장하는 객체 검증 오류 발생시에 여기에 저장됨.
        if (bindingResult.hasErrors()) {
            return "/signup/signup_form";
        }

        if (!userCreateForm.getPassword1().equals(userCreateForm.getPassword2())) {
            bindingResult.rejectValue("password2", "passwordInCorrect", 
                    "2개의 패스워드가 일치하지 않습니다.");
            return "/signup/signup_form";
        }

        try { //userService 호출하여 사용자생성 값들 데이터베이스에 저장
            userService.create(userCreateForm.getUsername(), 
                    userCreateForm.getEmail(), userCreateForm.getPassword1(), userCreateForm.getName(), userCreateForm.getGender(), userCreateForm.getPostcode(), userCreateForm.getAddress(), userCreateForm.getDetailAddress(), userCreateForm.getExtraAddress()); //, userCreateForm.getGender()
            
        }catch(DataIntegrityViolationException e) {
            e.printStackTrace();
            bindingResult.reject("signupFailed", "이미 등록된 사용자입니다.");
            return "/signup/signup_form";
        }catch(Exception e) {
            e.printStackTrace();
            bindingResult.reject("signupFailed", e.getMessage());
            return "/signup/signup_form";
        }

        return "index3";
    }
}