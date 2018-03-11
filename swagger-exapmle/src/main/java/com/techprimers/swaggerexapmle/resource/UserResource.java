package com.techprimers.swaggerexapmle.resource;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("rest/user")
public class UserResource {

    @GetMapping
    public List<User>getUsers(){
        return Arrays.asList(
                new User("Peter", 2000L),
                new User("Sam", 1000L)
        );
    }

    @GetMapping("/{username}")
    public User getUser(@PathVariable("username") final String userName){
        return new User(userName, 1000l);
    }

    private class User{
        private String username;
        private long salary;

        public User(String username, long salary) {
            this.username = username;
            this.salary = salary;
        }

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public long getSalary() {
            return salary;
        }

        public void setSalary(long salary) {
            this.salary = salary;
        }
    }
}
