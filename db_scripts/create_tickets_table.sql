-- Table: public.tickets

-- DROP TABLE public.tickets;

CREATE TABLE public.tickets
(
    id bigint NOT NULL DEFAULT nextval('tickets_id_seq'::regclass),
    event_id bigint NOT NULL,
    buyer_user_id bigint NOT NULL,
    CONSTRAINT tickets_pkey PRIMARY KEY (id),
    CONSTRAINT event_id FOREIGN KEY (event_id)
        REFERENCES public.events (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT user_id FOREIGN KEY (buyer_user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.tickets
    OWNER to postgres;