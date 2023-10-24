package com.lhs.sbb.question;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


//리포지터리는 엔티티에 의해 생성된 데이터베이스 테이블에 접근하는 메서드들을 사용하기 위한
//인터페이스임. crud 기능을 처리하는 정의가 있는 계층
//questionrepository 는 jparepository 를 상속받음 <>안에는 대상이되는 엔티티와 해당
//pk의 속성 타입을 지정해야함. 생성규칙이니 그냥 외울것.
public interface QuestionRepository extends JpaRepository<Question, Integer> {
    Question findBySubject(String subject); //하나의 제목만 찾기
    Question findBySubjectAndContent(String subject, String content); //제목과 내용 찾기 and
    List<Question> findBySubjectLike(String subject); //특정 문자열이 포함된 제목 찾기
    Page<Question> findAll(Pageable pageable);
    Page<Question> findAll(Specification<Question> spec, Pageable pageable);
    
    @Query("select "
            + "distinct q "
            + "from Question q " 
            + "left outer join SiteUser u1 on q.author=u1 "
            + "left outer join Answer a on a.question=q "
            + "left outer join SiteUser u2 on a.author=u2 "
            + "where "
            + "   q.subject like %:kw% "
            + "   or q.content like %:kw% "
            + "   or u1.username like %:kw% "
            + "   or a.content like %:kw% "
            + "   or u2.username like %:kw% ")
    Page<Question> findAllByKeyword(@Param("kw") String kw, Pageable pageable);
}
