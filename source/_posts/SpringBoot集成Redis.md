---
title: Spring Boot集成Redis详解与面试要点
date: 2025-09-04 16:00:00
tags: 
  - Spring Boot
  - Redis
  - 缓存
  - 面试
  - 八股文
categories: 
  - 技术教程
  - 中间件
description: 详细介绍Spring Boot如何集成Redis，包含Redis基本特征、使用场景以及常见面试题
cover: /img/redis-cover.png
---

# 🚀 Spring Boot集成Redis详解与面试要点

Redis是一个高性能的key-value数据库，在Spring Boot项目中广泛用于缓存、会话管理等场景。本文将详细介绍如何在Spring Boot中集成Redis，以及Redis的核心特性和面试要点。

## 📋 目录

1. [Redis基础概念](#Redis基础概念)
2. [Spring Boot集成Redis](#Spring-Boot集成Redis)
3. [Redis基本操作](#Redis基本操作)
4. [缓存注解使用](#缓存注解使用)
5. [Redis高级特性](#Redis高级特性)
6. [性能优化与最佳实践](#性能优化与最佳实践)
7. [面试八股文](#面试八股文)

---

## 🔍 Redis基础概念

### Redis是什么？

Redis (Remote Dictionary Server) 是一个开源的、基于内存的数据结构存储系统，可以用作数据库、缓存和消息代理。

### 核心特性

#### 1. 数据类型丰富
```
• String  - 字符串
• Hash    - 哈希表
• List    - 列表
• Set     - 集合
• ZSet    - 有序集合
• Stream  - 流
• Bitmap  - 位图
• HyperLogLog - 基数统计
```

#### 2. 持久化方案
- **RDB**: 快照持久化
- **AOF**: 追加文件持久化
- **混合持久化**: RDB + AOF

#### 3. 高可用架构
- **主从复制**: Master-Slave
- **哨兵模式**: Sentinel
- **集群模式**: Cluster

---

## ⚙️ Spring Boot集成Redis

### 1. 添加依赖

```xml
<!-- pom.xml -->
<dependencies>
    <!-- Spring Boot Redis Starter -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-redis</artifactId>
    </dependency>
    
    <!-- 连接池依赖 -->
    <dependency>
        <groupId>org.apache.commons</groupId>
        <artifactId>commons-pool2</artifactId>
    </dependency>
    
    <!-- JSON处理 -->
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-databind</artifactId>
    </dependency>
</dependencies>
```

### 2. 配置文件

```yaml
# application.yml
spring:
  redis:
    # 单机配置
    host: localhost
    port: 6379
    password: 123456
    database: 0
    timeout: 6000ms
    
    # 连接池配置
    lettuce:
      pool:
        max-active: 8     # 最大连接数
        max-wait: -1ms    # 最大等待时间
        max-idle: 8       # 最大空闲连接
        min-idle: 0       # 最小空闲连接
    
    # 集群配置（可选）
    # cluster:
    #   nodes:
    #     - 192.168.1.100:7001
    #     - 192.168.1.100:7002
    #     - 192.168.1.100:7003
    #   max-redirects: 3
```

### 3. Redis配置类

```java
// config/RedisConfig.java
@Configuration
@EnableCaching
public class RedisConfig {
    
    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory factory) {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(factory);
        
        // JSON序列化配置
        Jackson2JsonRedisSerializer<Object> serializer = new Jackson2JsonRedisSerializer<>(Object.class);
        ObjectMapper om = new ObjectMapper();
        om.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        om.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);
        serializer.setObjectMapper(om);
        
        // Key序列化
        template.setKeySerializer(new StringRedisSerializer());
        template.setHashKeySerializer(new StringRedisSerializer());
        
        // Value序列化
        template.setValueSerializer(serializer);
        template.setHashValueSerializer(serializer);
        
        template.afterPropertiesSet();
        return template;
    }
    
    @Bean
    public CacheManager cacheManager(RedisConnectionFactory factory) {
        RedisCacheConfiguration config = RedisCacheConfiguration.defaultCacheConfig()
                .entryTtl(Duration.ofMinutes(30))
                .serializeKeysWith(RedisSerializationContext.SerializationPair.fromSerializer(new StringRedisSerializer()))
                .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(new Jackson2JsonRedisSerializer<>(Object.class)));
        
        return RedisCacheManager.builder(factory)
                .cacheDefaults(config)
                .build();
    }
}
```

---

## 💾 Redis基本操作

### 1. 创建Redis工具类

```java
// util/RedisUtil.java
@Component
public class RedisUtil {
    
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;
    
    // =============================common============================
    
    /**
     * 指定缓存失效时间
     */
    public boolean expire(String key, long time) {
        try {
            if (time > 0) {
                redisTemplate.expire(key, time, TimeUnit.SECONDS);
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    
    /**
     * 根据key获取过期时间
     */
    public long getExpire(String key) {
        return redisTemplate.getExpire(key, TimeUnit.SECONDS);
    }
    
    /**
     * 判断key是否存在
     */
    public boolean hasKey(String key) {
        try {
            return redisTemplate.hasKey(key);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    
    /**
     * 删除缓存
     */
    @SuppressWarnings("unchecked")
    public void del(String... key) {
        if (key != null && key.length > 0) {
            if (key.length == 1) {
                redisTemplate.delete(key[0]);
            } else {
                redisTemplate.delete(Arrays.asList(key));
            }
        }
    }
    
    // ============================String=============================
    
    /**
     * 普通缓存获取
     */
    public Object get(String key) {
        return key == null ? null : redisTemplate.opsForValue().get(key);
    }
    
    /**
     * 普通缓存放入
     */
    public boolean set(String key, Object value) {
        try {
            redisTemplate.opsForValue().set(key, value);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    
    /**
     * 普通缓存放入并设置时间
     */
    public boolean set(String key, Object value, long time) {
        try {
            if (time > 0) {
                redisTemplate.opsForValue().set(key, value, time, TimeUnit.SECONDS);
            } else {
                set(key, value);
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    
    /**
     * 递增
     */
    public long incr(String key, long delta) {
        if (delta < 0) {
            throw new RuntimeException("递增因子必须大于0");
        }
        return redisTemplate.opsForValue().increment(key, delta);
    }
    
    /**
     * 递减
     */
    public long decr(String key, long delta) {
        if (delta < 0) {
            throw new RuntimeException("递减因子必须大于0");
        }
        return redisTemplate.opsForValue().increment(key, -delta);
    }
    
    // ================================Hash=================================
    
    /**
     * HashGet
     */
    public Object hget(String key, String item) {
        return redisTemplate.opsForHash().get(key, item);
    }
    
    /**
     * 获取hashKey对应的所有键值
     */
    public Map<Object, Object> hmget(String key) {
        return redisTemplate.opsForHash().entries(key);
    }
    
    /**
     * HashSet
     */
    public boolean hmset(String key, Map<String, Object> map) {
        try {
            redisTemplate.opsForHash().putAll(key, map);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    
    /**
     * HashSet 并设置时间
     */
    public boolean hmset(String key, Map<String, Object> map, long time) {
        try {
            redisTemplate.opsForHash().putAll(key, map);
            if (time > 0) {
                expire(key, time);
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    
    // ============================List=============================
    
    /**
     * 获取list缓存的内容
     */
    public List<Object> lGet(String key, long start, long end) {
        try {
            return redisTemplate.opsForList().range(key, start, end);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    
    /**
     * 将list放入缓存
     */
    public boolean lSet(String key, Object value) {
        try {
            redisTemplate.opsForList().rightPush(key, value);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    
    // ============================Set=============================
    
    /**
     * 根据key获取Set中的所有值
     */
    public Set<Object> sGet(String key) {
        try {
            return redisTemplate.opsForSet().members(key);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    
    /**
     * 将数据放入set缓存
     */
    public long sSet(String key, Object... values) {
        try {
            return redisTemplate.opsForSet().add(key, values);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }
}
```

### 2. 使用示例

```java
// service/UserService.java
@Service
public class UserService {
    
    @Autowired
    private RedisUtil redisUtil;
    
    @Autowired
    private UserRepository userRepository;
    
    /**
     * 根据ID获取用户（带缓存）
     */
    public User getUserById(Long id) {
        String key = "user:" + id;
        
        // 先从Redis获取
        Object userObj = redisUtil.get(key);
        if (userObj != null) {
            return (User) userObj;
        }
        
        // Redis中没有，从数据库获取
        User user = userRepository.findById(id).orElse(null);
        if (user != null) {
            // 存入Redis，过期时间30分钟
            redisUtil.set(key, user, 1800);
        }
        
        return user;
    }
    
    /**
     * 更新用户（同步更新缓存）
     */
    public User updateUser(User user) {
        // 更新数据库
        User savedUser = userRepository.save(user);
        
        // 更新Redis缓存
        String key = "user:" + user.getId();
        redisUtil.set(key, savedUser, 1800);
        
        return savedUser;
    }
    
    /**
     * 删除用户（删除缓存）
     */
    public void deleteUser(Long id) {
        // 删除数据库记录
        userRepository.deleteById(id);
        
        // 删除Redis缓存
        String key = "user:" + id;
        redisUtil.del(key);
    }
}
```

---

## 🏷️ 缓存注解使用

### 1. 启用缓存注解

```java
// Application.java
@SpringBootApplication
@EnableCaching  // 启用缓存注解
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

### 2. 常用缓存注解

```java
@Service
public class ProductService {
    
    /**
     * @Cacheable: 查询时使用，如果缓存中有数据，直接返回缓存数据
     */
    @Cacheable(value = "product", key = "#id")
    public Product getProductById(Long id) {
        // 模拟数据库查询
        return productRepository.findById(id).orElse(null);
    }
    
    /**
     * @CachePut: 更新缓存，方法会被执行，结果会被缓存
     */
    @CachePut(value = "product", key = "#product.id")
    public Product updateProduct(Product product) {
        return productRepository.save(product);
    }
    
    /**
     * @CacheEvict: 删除缓存
     */
    @CacheEvict(value = "product", key = "#id")
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
    
    /**
     * @CacheEvict: 清空所有缓存
     */
    @CacheEvict(value = "product", allEntries = true)
    public void clearAllProductCache() {
        // 清空product相关的所有缓存
    }
    
    /**
     * @Caching: 组合多个缓存操作
     */
    @Caching(
        cacheable = @Cacheable(value = "product", key = "#id"),
        put = @CachePut(value = "productList", key = "#id")
    )
    public Product getAndCacheProduct(Long id) {
        return productRepository.findById(id).orElse(null);
    }
    
    /**
     * 条件缓存
     */
    @Cacheable(value = "product", key = "#id", condition = "#id > 0")
    public Product getProductWithCondition(Long id) {
        return productRepository.findById(id).orElse(null);
    }
    
    /**
     * 条件清除缓存
     */
    @CacheEvict(value = "product", key = "#id", condition = "#result != null")
    public Product deleteProductWithCondition(Long id) {
        Product product = productRepository.findById(id).orElse(null);
        if (product != null) {
            productRepository.delete(product);
        }
        return product;
    }
}
```

### 3. 自定义缓存配置

```java
@Configuration
public class CacheConfig {
    
    /**
     * 自定义缓存管理器
     */
    @Bean
    @Primary
    public CacheManager cacheManager(RedisConnectionFactory factory) {
        // 不同的缓存策略
        Map<String, RedisCacheConfiguration> cacheConfigurations = new HashMap<>();
        
        // 用户缓存：30分钟过期
        cacheConfigurations.put("user", 
            RedisCacheConfiguration.defaultCacheConfig()
                .entryTtl(Duration.ofMinutes(30))
                .prefixCacheNameWith("cache:user:"));
        
        // 产品缓存：1小时过期
        cacheConfigurations.put("product", 
            RedisCacheConfiguration.defaultCacheConfig()
                .entryTtl(Duration.ofHours(1))
                .prefixCacheNameWith("cache:product:"));
        
        // 配置缓存：永不过期
        cacheConfigurations.put("config", 
            RedisCacheConfiguration.defaultCacheConfig()
                .prefixCacheNameWith("cache:config:"));
        
        return RedisCacheManager.builder(factory)
                .cacheDefaults(RedisCacheConfiguration.defaultCacheConfig())
                .withInitialCacheConfigurations(cacheConfigurations)
                .build();
    }
}
```

---

## 🚄 Redis高级特性

### 1. 分布式锁

```java
@Component
public class RedisDistributedLock {
    
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;
    
    private static final String LOCK_PREFIX = "lock:";
    private static final int DEFAULT_EXPIRE_TIME = 30; // 30秒
    
    /**
     * 获取分布式锁
     */
    public boolean tryLock(String key, String value, int expireTime) {
        String lockKey = LOCK_PREFIX + key;
        Boolean result = redisTemplate.opsForValue().setIfAbsent(
            lockKey, value, expireTime, TimeUnit.SECONDS);
        return Boolean.TRUE.equals(result);
    }
    
    /**
     * 释放分布式锁
     */
    public boolean releaseLock(String key, String value) {
        String lockKey = LOCK_PREFIX + key;
        String script = "if redis.call('get', KEYS[1]) == ARGV[1] then " +
                       "return redis.call('del', KEYS[1]) else return 0 end";
        
        Long result = redisTemplate.execute(
            new DefaultRedisScript<>(script, Long.class),
            Collections.singletonList(lockKey),
            value);
        
        return Long.valueOf(1).equals(result);
    }
    
    /**
     * 使用分布式锁执行业务
     */
    public <T> T executeWithLock(String lockKey, Supplier<T> supplier) {
        String lockValue = UUID.randomUUID().toString();
        boolean locked = false;
        
        try {
            locked = tryLock(lockKey, lockValue, DEFAULT_EXPIRE_TIME);
            if (!locked) {
                throw new RuntimeException("获取锁失败");
            }
            
            return supplier.get();
        } finally {
            if (locked) {
                releaseLock(lockKey, lockValue);
            }
        }
    }
}

// 使用示例
@Service
public class OrderService {
    
    @Autowired
    private RedisDistributedLock distributedLock;
    
    public String createOrder(String userId) {
        return distributedLock.executeWithLock("order:" + userId, () -> {
            // 业务逻辑：创建订单
            // 这里的代码在分布式环境下是线程安全的
            return "ORDER_" + System.currentTimeMillis();
        });
    }
}
```

### 2. 消息发布订阅

```java
// 消息监听器
@Component
public class RedisMessageListener implements MessageListener {
    
    @Override
    public void onMessage(Message message, byte[] pattern) {
        String channel = new String(pattern);
        String msg = new String(message.getBody());
        System.out.println("收到消息 - 频道: " + channel + ", 内容: " + msg);
    }
}

// 消息配置
@Configuration
public class RedisMessageConfig {
    
    @Bean
    public RedisMessageListenerContainer messageListenerContainer(
            RedisConnectionFactory factory,
            RedisMessageListener messageListener) {
        
        RedisMessageListenerContainer container = new RedisMessageListenerContainer();
        container.setConnectionFactory(factory);
        
        // 订阅频道
        container.addMessageListener(messageListener, 
            new ChannelTopic("news"));
        
        return container;
    }
}

// 消息发布
@Service
public class MessagePublisher {
    
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;
    
    public void publishMessage(String channel, String message) {
        redisTemplate.convertAndSend(channel, message);
    }
}
```

### 3. 布隆过滤器

```java
@Component
public class BloomFilterService {
    
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;
    
    private static final String BF_KEY = "bloom_filter";
    
    /**
     * 添加元素到布隆过滤器
     */
    public void add(String item) {
        // 使用Redis的SETBIT命令实现布隆过滤器
        int[] hashes = getHashes(item);
        for (int hash : hashes) {
            redisTemplate.opsForValue().setBit(BF_KEY, hash, true);
        }
    }
    
    /**
     * 判断元素是否可能存在
     */
    public boolean mightContain(String item) {
        int[] hashes = getHashes(item);
        for (int hash : hashes) {
            if (!redisTemplate.opsForValue().getBit(BF_KEY, hash)) {
                return false; // 肯定不存在
            }
        }
        return true; // 可能存在
    }
    
    /**
     * 计算多个哈希值
     */
    private int[] getHashes(String item) {
        int[] hashes = new int[3]; // 使用3个哈希函数
        
        int hash1 = item.hashCode();
        int hash2 = hash1 >>> 16;
        
        for (int i = 0; i < 3; i++) {
            int hash = hash1 + i * hash2;
            if (hash < 0) {
                hash = ~hash;
            }
            hashes[i] = hash % (1024 * 1024 * 8); // 1MB位图
        }
        
        return hashes;
    }
}
```

---

## ⚡ 性能优化与最佳实践

### 1. 连接池优化

```yaml
spring:
  redis:
    lettuce:
      pool:
        max-active: 16    # 最大连接数
        max-idle: 8       # 最大空闲连接
        min-idle: 2       # 最小空闲连接
        max-wait: 3000ms  # 最大等待时间
      shutdown-timeout: 100ms
```

### 2. 序列化优化

```java
@Configuration
public class RedisOptimizationConfig {
    
    /**
     * 使用压缩序列化
     */
    @Bean
    public RedisTemplate<String, Object> compressedRedisTemplate(
            RedisConnectionFactory factory) {
        
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(factory);
        
        // 使用压缩的JSON序列化
        Jackson2JsonRedisSerializer<Object> serializer = 
            new Jackson2JsonRedisSerializer<>(Object.class);
        
        ObjectMapper om = new ObjectMapper();
        om.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        om.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        serializer.setObjectMapper(om);
        
        template.setKeySerializer(new StringRedisSerializer());
        template.setValueSerializer(serializer);
        
        return template;
    }
}
```

### 3. 缓存穿透解决方案

```java
@Service
public class CacheService {
    
    @Autowired
    private RedisUtil redisUtil;
    
    @Autowired
    private BloomFilterService bloomFilter;
    
    /**
     * 防止缓存穿透的查询方法
     */
    public User getUserById(Long id) {
        // 1. 布隆过滤器预检
        if (!bloomFilter.mightContain("user:" + id)) {
            return null; // 肯定不存在，直接返回
        }
        
        // 2. 查询缓存
        String key = "user:" + id;
        Object cached = redisUtil.get(key);
        
        if (cached != null) {
            // 检查是否是空对象（防止缓存穿透）
            if ("NULL".equals(cached)) {
                return null;
            }
            return (User) cached;
        }
        
        // 3. 查询数据库
        User user = userRepository.findById(id).orElse(null);
        
        if (user != null) {
            // 缓存真实数据
            redisUtil.set(key, user, 1800);
        } else {
            // 缓存空对象，防止缓存穿透（较短的过期时间）
            redisUtil.set(key, "NULL", 300);
        }
        
        return user;
    }
}
```

### 4. 缓存雪崩解决方案

```java
@Service
public class CacheBreakdownService {
    
    @Autowired
    private RedisUtil redisUtil;
    
    @Autowired
    private RedisDistributedLock distributedLock;
    
    /**
     * 防止缓存击穿的热点数据查询
     */
    public Product getHotProduct(Long productId) {
        String key = "hot_product:" + productId;
        
        // 1. 查询缓存
        Object cached = redisUtil.get(key);
        if (cached != null) {
            return (Product) cached;
        }
        
        // 2. 使用分布式锁防止缓存击穿
        String lockKey = "lock:product:" + productId;
        
        return distributedLock.executeWithLock(lockKey, () -> {
            // 双重检查
            Object recheck = redisUtil.get(key);
            if (recheck != null) {
                return (Product) recheck;
            }
            
            // 查询数据库
            Product product = productRepository.findById(productId).orElse(null);
            
            if (product != null) {
                // 随机过期时间，防止缓存雪崩
                int randomExpire = 3600 + new Random().nextInt(600); // 1小时 + 随机10分钟
                redisUtil.set(key, product, randomExpire);
            }
            
            return product;
        });
    }
}
```

---

## 📚 面试八股文

### 1. Redis基础问题

#### Q: Redis为什么这么快？
**A:** 
1. **纯内存操作**: 数据存储在内存中，避免磁盘I/O
2. **单线程模型**: 避免了线程切换和锁竞争的开销
3. **高效的数据结构**: 针对不同数据类型进行了优化
4. **I/O多路复用**: 使用epoll等机制处理大量连接
5. **简单的协议**: RESP协议简单高效

#### Q: Redis的数据类型及应用场景？
**A:**
```
String  - 缓存、计数器、分布式锁
Hash    - 用户信息、购物车
List    - 消息队列、最新列表
Set     - 标签、好友关系、去重
ZSet    - 排行榜、延时队列
Stream  - 消息流、事件溯源
Bitmap  - 用户签到、布隆过滤器
HyperLogLog - UV统计、基数估算
```

#### Q: Redis持久化方式？
**A:**
- **RDB**:
  - 优点: 文件小、恢复快、对性能影响小
  - 缺点: 数据可能丢失、fork耗时
  - 适用: 数据备份、灾难恢复

- **AOF**:
  - 优点: 数据安全、可读性好
  - 缺点: 文件大、恢复慢
  - 适用: 数据安全性要求高

- **混合持久化**: 结合RDB和AOF的优点

### 2. 高级特性问题

#### Q: Redis如何实现分布式锁？
**A:**
```java
// 1. 加锁：使用SET NX EX
SET lock_key unique_value NX EX 30

// 2. 解锁：使用Lua脚本保证原子性
if redis.call("get", KEYS[1]) == ARGV[1] then
    return redis.call("del", KEYS[1])
else
    return 0
end
```

**注意点:**
- 必须设置过期时间，防止死锁
- 解锁时要验证锁的拥有者
- 使用Lua脚本保证解锁的原子性

#### Q: 如何解决缓存穿透、击穿、雪崩？

**A:**

**缓存穿透**: 查询不存在的数据
- 解决方案: 布隆过滤器、缓存空对象

**缓存击穿**: 热点数据过期
- 解决方案: 分布式锁、热点数据永不过期

**缓存雪崩**: 大量缓存同时过期
- 解决方案: 随机过期时间、多级缓存

#### Q: Redis集群模式？
**A:**
- **主从复制**: 读写分离，主节点写，从节点读
- **哨兵模式**: 自动故障转移，监控主从状态
- **集群模式**: 数据分片，16384个哈希槽

### 3. 性能优化问题

#### Q: Redis性能优化策略？
**A:**
1. **内存优化**:
   - 选择合适的数据类型
   - 设置合理的过期时间
   - 使用内存淘汰策略

2. **网络优化**:
   - 使用连接池
   - 批量操作（Pipeline）
   - 减少网络往返次数

3. **CPU优化**:
   - 避免大key操作
   - 合理使用复杂命令
   - 监控慢查询

#### Q: Redis内存淘汰策略？
**A:**
```
noeviction     - 不淘汰，内存满时报错
allkeys-lru    - 所有key中淘汰最少使用的
allkeys-lfu    - 所有key中淘汰最少频率使用的
allkeys-random - 所有key中随机淘汰
volatile-lru   - 过期key中淘汰最少使用的
volatile-lfu   - 过期key中淘汰最少频率使用的
volatile-random - 过期key中随机淘汰
volatile-ttl   - 淘汰即将过期的key
```

### 4. 实际应用问题

#### Q: Redis在电商系统中的应用？
**A:**
1. **商品缓存**: 热门商品信息缓存
2. **购物车**: Hash存储用户购物车
3. **库存扣减**: 原子性操作防止超卖
4. **排行榜**: ZSet实现销量排行
5. **限流**: 滑动窗口限流
6. **分布式锁**: 防止重复下单

#### Q: 如何保证Redis和数据库数据一致性？
**A:**
1. **Cache Aside Pattern**: 
   - 读: 先读缓存，miss则读DB并更新缓存
   - 写: 先更新DB，再删除缓存

2. **Write Behind Pattern**: 
   - 先更新缓存，异步更新DB

3. **Read Through/Write Through**: 
   - 由缓存层负责数据库操作

**最佳实践**: Cache Aside + 延时双删

```java
// 延时双删示例
public void updateUser(User user) {
    // 1. 删除缓存
    redisUtil.del("user:" + user.getId());
    
    // 2. 更新数据库
    userRepository.save(user);
    
    // 3. 延时删除缓存（防止数据库主从延迟）
    CompletableFuture.runAsync(() -> {
        try {
            Thread.sleep(1000); // 延时1秒
            redisUtil.del("user:" + user.getId());
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    });
}
```

---

## 🎉 总结

通过本文，你已经掌握了：

✅ **Redis基础**: 数据类型、持久化、集群  
✅ **Spring Boot集成**: 配置、工具类、注解使用  
✅ **高级特性**: 分布式锁、消息订阅、布隆过滤器  
✅ **性能优化**: 缓存策略、一致性保证  
✅ **面试要点**: 常见问题和解决方案  

Redis是现代应用架构中不可或缺的组件，合理使用Redis能够显著提升系统性能和用户体验。

## 🚀 进阶学习建议

1. **Redis源码学习** - 深入理解底层实现
2. **Redis运维** - 监控、调优、故障排查  
3. **Redis扩展** - Redisearch、RedisJSON等模块
4. **微服务应用** - 在分布式系统中的最佳实践

Happy coding! 🎯

---

> **作者**: 五子棋  
> **发布时间**: 2025年9月4日  
> **标签**: #SpringBoot #Redis #缓存 #面试 #八股文itle: SpringBoot集成Redis
date: 2025-09-04 16:39:34
tags:
---
