# README

## users_groupsテーブル

| Column   | Type | Options                        |
|----------|------|--------------------------------|
| user_id  | refference  | null: false, foreign_key: true |
| group_id | refference  | null: false, foreign_key: true |

### Association

  - belongs_to :group

  - belongs_to :user

## usersテーブル

| Column   | Type   | Options                                     |
|----------|--------|---------------------------------------------|
| name     | string | null: false, unique: true, index: true      |
| mail     | string | null: false, unique: true, index: true      |
| password | string | null: false                                 |
| group_id | refference    | null: false, foreign_key: true              |

### Association

  - has_many :messages

  - has_many :groups, through: :users_groups

## groupsテーブル

| Column  | Type   | Options                        |
|---------|--------|--------------------------------|
| name    | string | null: false                    |
| user_id | refference    | null: false, foreign_key: true |

### Association

  - has_many :messages

  - has_many :users, through: :users_groups

## messagesテーブル

| Column   | Type   | Options                        |
|----------|--------|--------------------------------|
| user_id  | refference    | null: false, foreign_key: true |
| group_id | refference    | null: false, foreign_key: true |
| body     | text   | null: false                    |
| image    | string |                                |

### Association

  - belongs_to :user

  - belongs_to :group