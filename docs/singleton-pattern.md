---
title: '再也别用 Singleton 了好吗?'
date: '2025-03-05'
tags: ['Python']
---

# 再也别用 Singleton 了好吗?

单例模式（Singleton Pattern）是一种常见的设计模式，它确保一个类只有一个实例，并提供一个全局访问点。但是，这种模式在现代编程中常常被滥用，甚至被认为是一种反模式。

## 单例模式的问题

1. **全局状态**：单例本质上是一种全局状态，这会使得代码难以测试和维护。
2. **隐藏依赖**：使用单例的代码会隐藏其依赖关系，使得代码的耦合性增加。
3. **并发问题**：在多线程环境中，单例的实现需要考虑线程安全问题。

## 替代方案

```python
# 不好的做法 - 使用单例
class Database:
    _instance = None
    
    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance
        
    def query(self, sql):
        # 执行查询
        pass

# 更好的做法 - 依赖注入
class Database:
    def query(self, sql):
        # 执行查询
        pass

class UserRepository:
    def __init__(self, database):
        self.database = database
        
    def find_user(self, user_id):
        return self.database.query(f"SELECT * FROM users WHERE id = {user_id}")
```

依赖注入使得代码更容易测试，依赖关系更加明确，并且避免了全局状态带来的问题。