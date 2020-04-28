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
|name|strings|null: false|


### Association
- has_many :groups_users
- has_many :users
- has_many :messages

## userテーブル

|Column|Type|Options|
|------|----|-------|
|email|strings|null: false|
|password|strings|null: false|
|nick_name|strings|null: false|

### Association
- has_many :groups_users
- has_many :users
- has_many :messages

## tweetsテーブル
|Column|Type|Options|
|------|----|-------|
|image|text||
|text|text||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group
