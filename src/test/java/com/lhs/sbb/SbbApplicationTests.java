package com.lhs.sbb;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import com.lhs.sbb.answer.Answer;
import com.lhs.sbb.answer.AnswerRepository;
import com.lhs.sbb.question.Question;
import com.lhs.sbb.question.QuestionRepository;
import com.lhs.sbb.question.QuestionService;


@SpringBootTest
class SbbApplicationTests {

    @Autowired
    // private QuestionService questionService;
    private QuestionRepository questionRepository;

    @Test
    void testJpa() {
        // List<Question> all = this.questionRepository.findAll();
        // assertEquals(301, all.size());

        // Question q = all.get(0);
        // assertEquals("질문ㅂ", q.getSubject());

        // Optional<Question> oq = this.questionRepository.findById(1);
        // if(oq.isPresent()) {
        //     Question q = oq.get();
        //     assertEquals("질문ㅂ", q.getSubject());
        // }

        // Question q = this.questionRepository.findBySubject("질문ㅂ");
        // assertEquals(1, q.getId());

        // Optional<Question> oq = this.questionRepository.findById(1);
        // assertTrue(oq.isPresent());
        // Question q = oq.get();
        // q.setSubject("수정된 제목");
        // this.questionRepository.save(q);

        assertEquals(301, this.questionRepository.count());
        Optional<Question> oq = this.questionRepository.findById(1);
        assertTrue(oq.isPresent());
        Question q = oq.get();
        this.questionRepository.delete(q);
        assertEquals(300, this.questionRepository.count());

        // for (int i = 1; i <= 300; i++) {
        //     String subject = String.format("테스트 데이터입니다:[%03d]", i);
        //     String content = "내용무";
        //     this.questionService.create(subject, content, null);
        // }
    }
}