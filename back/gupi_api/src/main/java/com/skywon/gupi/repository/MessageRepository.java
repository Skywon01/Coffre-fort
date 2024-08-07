package com.skywon.gupi.repository;

import com.skywon.gupi.entity.Message;
import com.skywon.gupi.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findBySenderIdAndRecipientId(User sender, User recipient);
}
