---
title: SpringBoot - 从零开始
date: 2025-09-04 15:30:00
tags: 
  - Spring Boot
  - Java
  - 后端开发
  - 教程
categories: 
  - 技术教程
  - Java开发
description: 从零开始学习Spring Boot，包含环境配置、项目创建、基础开发到部署的完整流程
cover: /img/springboot-cover.png
---

# 🌱 Spring Boot - 从零开始

欢迎来到Spring Boot！这篇文章将带你从零开始，掌握Spring Boot开发的基本流程。

## 📋 目录

1. [环境准备](#环境准备)
2. [项目创建](#项目创建)
3. [基础配置](#基础配置)
4. [第一个Controller](#第一个Controller)
5. [数据库集成](#数据库集成)
6. [RESTful API开发](#RESTful-API开发)
7. [测试与调试](#测试与调试)
8. [打包与部署](#打包与部署)

---

## 🛠️ 环境准备

### 1. 必需软件安装

#### Java 开发环境
```bash
# 检查Java版本 (推荐JDK 17或更高版本)
java -version
javac -version
```

#### 开发工具选择
- **IntelliJ IDEA** (推荐)
- **Eclipse** 
- **Visual Studio Code** (配合Java扩展)

#### Maven 构建工具
```bash
# 检查Maven版本
mvn -version
```

### 2. 环境变量配置

```bash
# Windows
set JAVA_HOME=C:\Program Files\Java\jdk-17
set PATH=%JAVA_HOME%\bin;%PATH%

# Linux/Mac
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk
export PATH=$JAVA_HOME/bin:$PATH
```

---

## 🚀 项目创建

### 方法一：使用 Spring Initializr 网站

1. 访问 [https://start.spring.io/](https://start.spring.io/)
2. 配置项目基本信息：
   ```
   Project: Maven Project
   Language: Java
   Spring Boot: 3.2.x (最新稳定版)
   Group: com.example
   Artifact: demo
   Name: demo
   Description: Demo project for Spring Boot
   Package name: com.example.demo
   Packaging: Jar
   Java: 17
   ```

3. 添加依赖项：
   - **Spring Web** - 构建Web应用
   - **Spring Data JPA** - 数据访问层
   - **H2 Database** - 内存数据库(开发测试用)
   - **MySQL Driver** - MySQL数据库驱动
   - **Spring Boot DevTools** - 开发工具

4. 点击 **Generate** 下载项目压缩包

### 方法二：使用 IDE 创建

#### IntelliJ IDEA 创建步骤：
```
1. File → New → Project
2. 选择 Spring Initializr
3. 配置项目信息 (同上)
4. 选择依赖项
5. Create
```

### 方法三：使用命令行

```bash
# 使用 Spring Boot CLI
spring init --dependencies=web,data-jpa,h2,mysql,devtools demo
cd demo
```

---

## ⚙️ 基础配置

### 1. 项目结构解析

```
src/
├── main/
│   ├── java/
│   │   └── com/example/demo/
│   │       ├── DemoApplication.java     # 主启动类
│   │       ├── controller/              # 控制器层
│   │       ├── service/                 # 服务层
│   │       ├── repository/              # 数据访问层
│   │       └── model/                   # 实体类
│   └── resources/
│       ├── application.properties       # 主配置文件
│       ├── static/                      # 静态资源
│       └── templates/                   # 模板文件
└── test/                               # 测试代码
```

### 2. 配置文件设置

#### application.properties
```properties
# 服务器配置
server.port=8080
server.servlet.context-path=/api

# 数据库配置
spring.datasource.url=jdbc:mysql://localhost:3306/demo_db
spring.datasource.username=root
spring.datasource.password=123456
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA配置
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# 日志配置
logging.level.com.example.demo=DEBUG
logging.pattern.console=%d{yyyy-MM-dd HH:mm:ss} - %msg%n
```

#### 或使用 application.yml (推荐)
```yaml
server:
  port: 8080
  servlet:
    context-path: /api

spring:
  datasource:
    url: jdbc:mysql://localhost:3306/demo_db
    username: root
    password: 123456
    driver-class-name: com.mysql.cj.jdbc.Driver
  
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        format_sql: true

logging:
  level:
    com.example.demo: DEBUG
  pattern:
    console: "%d{yyyy-MM-dd HH:mm:ss} - %msg%n"
```

---

## 🎯 第一个Controller

### 1. 创建简单的Hello World

```java
// src/main/java/com/example/demo/controller/HelloController.java
package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/hello")
public class HelloController {
    
    @GetMapping
    public String hello() {
        return "Hello, Spring Boot!";
    }
    
    @GetMapping("/{name}")
    public String helloWithName(@PathVariable String name) {
        return "Hello, " + name + "!";
    }
    
    @PostMapping
    public String createHello(@RequestBody String message) {
        return "Received: " + message;
    }
}
```

### 2. 启动应用

```java
// src/main/java/com/example/demo/DemoApplication.java
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
```

### 3. 测试接口

```bash
# 启动应用后测试
curl http://localhost:8080/api/hello
curl http://localhost:8080/api/hello/张三
```

---

## 🗄️ 数据库集成

### 1. 创建实体类

```java
// src/main/java/com/example/demo/model/User.java
package com.example.demo.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String username;
    
    @Column(nullable = false)
    private String email;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    // 构造函数
    public User() {}
    
    public User(String username, String email) {
        this.username = username;
        this.email = email;
        this.createdAt = LocalDateTime.now();
    }
    
    // Getter和Setter方法
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
```

### 2. 创建Repository接口

```java
// src/main/java/com/example/demo/repository/UserRepository.java
package com.example.demo.repository;

import com.example.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    // 根据用户名查找
    Optional<User> findByUsername(String username);
    
    // 根据邮箱查找
    Optional<User> findByEmail(String email);
    
    // 自定义查询
    @Query("SELECT u FROM User u WHERE u.username LIKE %?1%")
    List<User> findByUsernameContaining(String username);
}
```

### 3. 创建Service层

```java
// src/main/java/com/example/demo/service/UserService.java
package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }
    
    public User createUser(User user) {
        return userRepository.save(user);
    }
    
    public User updateUser(Long id, User userDetails) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        user.setUsername(userDetails.getUsername());
        user.setEmail(userDetails.getEmail());
        
        return userRepository.save(user);
    }
    
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
```

---

## 🌐 RESTful API开发

### 创建完整的用户管理API

```java
// src/main/java/com/example/demo/controller/UserController.java
package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*") // 允许跨域请求
public class UserController {
    
    @Autowired
    private UserService userService;
    
    // 获取所有用户
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
    
    // 根据ID获取用户
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userService.getUserById(id)
            .map(user -> ResponseEntity.ok().body(user))
            .orElse(ResponseEntity.notFound().build());
    }
    
    // 创建新用户
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }
    
    // 更新用户
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        try {
            User updatedUser = userService.updateUser(id, userDetails);
            return ResponseEntity.ok(updatedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    // 删除用户
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }
}
```

---

## 🧪 测试与调试

### 1. 单元测试

```java
// src/test/java/com/example/demo/service/UserServiceTest.java
package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.Arrays;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {
    
    @Mock
    private UserRepository userRepository;
    
    @InjectMocks
    private UserService userService;
    
    @Test
    void getAllUsers_ShouldReturnAllUsers() {
        // Arrange
        User user1 = new User("user1", "user1@email.com");
        User user2 = new User("user2", "user2@email.com");
        List<User> expectedUsers = Arrays.asList(user1, user2);
        
        when(userRepository.findAll()).thenReturn(expectedUsers);
        
        // Act
        List<User> actualUsers = userService.getAllUsers();
        
        // Assert
        assertEquals(expectedUsers.size(), actualUsers.size());
        verify(userRepository, times(1)).findAll();
    }
}
```

### 2. 集成测试

```java
// src/test/java/com/example/demo/controller/UserControllerTest.java
package com.example.demo.controller;

import com.example.demo.model.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureWebMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureWebMvc
@TestPropertySource(locations = "classpath:application-test.properties")
class UserControllerTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @Autowired
    private ObjectMapper objectMapper;
    
    @Test
    void createUser_ShouldReturnCreatedUser() throws Exception {
        User user = new User("testuser", "test@email.com");
        
        mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isOk())
                .andExpected(jsonPath("$.username").value("testuser"));
    }
}
```

### 3. 使用Postman测试API

```json
// POST /api/users
{
    "username": "testuser",
    "email": "test@example.com"
}

// GET /api/users
// 返回所有用户列表

// GET /api/users/1
// 返回ID为1的用户

// PUT /api/users/1
{
    "username": "updateduser",
    "email": "updated@example.com"
}

// DELETE /api/users/1
// 删除ID为1的用户
```

---

## 📦 打包与部署

### 1. Maven打包

```bash
# 清理并打包
mvn clean package

# 跳过测试打包
mvn clean package -DskipTests

# 打包后的jar文件位置
target/demo-0.0.1-SNAPSHOT.jar
```

### 2. 运行JAR文件

```bash
# 运行打包后的应用
java -jar target/demo-0.0.1-SNAPSHOT.jar

# 指定配置文件
java -jar target/demo-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod

# 指定端口
java -jar target/demo-0.0.1-SNAPSHOT.jar --server.port=9090
```

### 3. Docker部署

#### Dockerfile
```dockerfile
FROM openjdk:17-jdk-slim

WORKDIR /app

COPY target/demo-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
```

#### 构建和运行
```bash
# 构建Docker镜像
docker build -t spring-boot-demo .

# 运行容器
docker run -p 8080:8080 spring-boot-demo
```

### 4. 生产环境配置

#### application-prod.yml
```yaml
server:
  port: 8080

spring:
  datasource:
    url: jdbc:mysql://prod-db:3306/prod_db
    username: ${DB_USERNAME}
    password: ${DB_PASSWORD}
  
  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: false

logging:
  level:
    root: INFO
    com.example.demo: INFO
  file:
    name: /var/log/spring-boot-demo.log
```

---

## 🎉 总结

恭喜！你已经完成了Spring Boot从零开始的完整学习之旅。通过这个教程，你学会了：

✅ **环境搭建** - Java、Maven、IDE配置  
✅ **项目创建** - 使用Spring Initializr快速创建项目  
✅ **基础开发** - Controller、Service、Repository三层架构  
✅ **数据库集成** - JPA/Hibernate使用  
✅ **API开发** - RESTful接口设计与实现  
✅ **测试编写** - 单元测试和集成测试  
✅ **部署上线** - JAR打包、Docker容器化  

## 🚀 下一步学习建议

1. **Spring Security** - 添加认证授权
2. **Spring Cloud** - 微服务架构
3. **Redis集成** - 缓存优化
4. **消息队列** - RabbitMQ/Kafka
5. **监控与日志** - Actuator、ELK栈

Happy coding! 🎯

---

> **作者**: 五子棋  
> **发布时间**: 2025年9月4日  
> **标签**: #SpringBoot #Java #后端开发 #教程itle: SpringBoot-从零开始
date: 2025-09-04 16:01:45
tags:
---
