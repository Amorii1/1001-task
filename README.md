# 1001-task

## Features
- User Authentication (JWT + bcrypt)
- Video Upload & Metadata Management (Multer + Redis) 
- API Security (Helmet, CORS, Validation)
- TypeScript Support
- Prisma ORM (PostgreSQL)

## RUN CODE GUIDE 
- Get Redis ready and running
- Get Postgresql ready and running
- Git clone https://github.com/your-repo/1001-task.git
- cd 1001-task
- Get {.env} file ready using the example
- Create {/Videos} Folder set in the root folder

### CONFIGURATIONS :
- `npm i`
- `prisma:migrate:deploy`
- `npm run prisma:seed`
- `npm run dev`

### Fixes & Improvements
- VideoService.deleteVideo : do not return anything.
- VideoController.deleteVideo : return successfully deleted message, make it body request, validate id.
- VideoController.uploadVideo : check existing by fetch listMeta(title) not by id.
- VideoController.getVideo : throw NotFoundError instance instead of InputError.
- VideoRouter : get/list apply authentication.

### Where used LLM ( tried to avoide getting help in assesment )
- only in list meta function, promises.