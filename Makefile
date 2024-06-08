.PHONY: app

up:
	docker-compose up -d
app:
	docker-compose exec laravel.test bash
db:
	docker-compose exec pgsql bash
npm:
	docker-compose exec laravel.test npm install
	docker-compose exec laravel.test npm run dev