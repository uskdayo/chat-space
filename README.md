## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## groupテーブル

|Column|Type|Options|
|------|----|-------|
|group_name|strings|null: false|
|user_name|strings|null: false|

### Association
- belongs_to :groups_users
- has_many :user
- has_many :message

## userテーブル

|Column|Type|Options|
|------|----|-------|
|email|strings|null: false|
|password|strings|null: false|
|nick_name|strings|null: false|

### Association
- belongs_to :groups_users
- has_many :user
- has_many :message

## tweetsテーブル
|Column|Type|Options|
|------|----|-------|
|image|text||
|text|text||
|user_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group
- belongs_to :groups_users