# 野帳.web

## 概要

野帳.web は、建設現場における測量業務を効率化することを目的とした Web アプリです。測量データの自動計算、データ保存・共有、エクセル形式での出力などの機能を提供しています。

## 課題

1. 野帳というメモ帳に記載される測量データの算出ミスが発生し得る
2. 紙ベースのため、測量データの管理や共有が困難
3. 測量データを報告や共有のためにエクセル等に入力しデータ化しなければならない

## 機能要件

1. 測量データを入力すると、自動計算される機能
2. 測量データを保存し、グループ内で共有・閲覧が可能な機能
3. 測量データをエクセル形式で出力できる機能

## 使用技術

-   フロントエンド：React/TypeScript/Redux
-   バックエンド：Laravel
-   データベース：PostgreSQL
-   インフラ：AWS-EC2/RDS/SES
-   利用ツール：Docker

## サイトページ

-   http://www.yacho-web.com

## AWS

-   接続：ssh -i "yacho-web.pem" ec2-user@ec2-13-113-201-170.ap-northeast-1.compute.amazonaws.com

## ソースコード

https://github.com/JunyaIshii/yacho.web

## 作者

Junya Ishii
