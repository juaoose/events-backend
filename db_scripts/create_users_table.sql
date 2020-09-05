CREATE TABLE public.USERS
(
    ID bigserial NOT NULL,
    USERNAME character varying(50) COLLATE pg_catalog."default" NOT NULL,
    EMAIL character varying(100) COLLATE pg_catalog."default" NOT NULL,
    SECRET character varying(200) COLLATE pg_catalog."default" NOT NULL,
    ROLE character varying(50) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "USERS_pkey" PRIMARY KEY (ID),
    CONSTRAINT "UNIQUE_EMAIL" UNIQUE (EMAIL),
    CONSTRAINT "UNIQUE_USERNAME" UNIQUE (USERNAME)
)

TABLESPACE pg_default;

ALTER TABLE public.USERS
    OWNER to postgres;