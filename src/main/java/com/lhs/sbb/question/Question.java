package com.lhs.sbb.question;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

import com.lhs.sbb.answer.Answer;
import com.lhs.sbb.user.SiteUser;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;
import com.lhs.sbb.comment.Comment;

//엔티티 클래스 기본적으로 데이터베이스 연결 모델? 이라보면 될듯
@Getter
@Setter //기본적으로는 setter 안씀 롬복의 builder 씀. 기본적으로 데이터 변경하려면 메서드를 엔티티에 추가함.
@Entity
public class Question {
    @Id //에너테이션이 id 속성을 기본키로 선택해줌
    @GeneratedValue(strategy = GenerationType.IDENTITY) //해당 에너테이션이 기본키를 자동으로 1씩 증가 시켜줌
    private Integer id;

    @Column(length = 200) //테이블 속성 정함.
    private String subject;

    @Column(columnDefinition = "TEXT") //글자수를 제한할 수 없을 경우에는 TEXT 옵션씀.
    private String content;

    private LocalDateTime createDate; //카멜형식이면 중간 대문자는 _형태로 바뀌고 소문자로 나옴
    
    // 한 질문의 답변은 여러개일 수 있으므로 설정함. 답변은 list 형태임
    //mappedBy 는 참조 엔티티의 속성
    //cascade remove 의 의미는 질문 삭제시에 달린 답변들도 전부 삭제되기 위함임.
    @OneToMany(mappedBy = "question", cascade = CascadeType.REMOVE)
    private List<Answer> answerList;

    @OneToMany(mappedBy = "question", cascade = CascadeType.REMOVE)
    private List<Comment> commentList;
    
    @ManyToOne
    private SiteUser author;
    
    private LocalDateTime modifyDate;
    
    @ManyToMany
    Set<SiteUser> voter;

   
}