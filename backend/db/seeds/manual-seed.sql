-- Script SQL manual para poblar la base de datos con datos de prueba
-- Este script es equivalente a ejecutar los seeders de TypeORM
--
-- IMPORTANTE: 
-- - Las contraseñas de los usuarios son strings vacíos hasheados con bcrypt (salt rounds = 10)
-- - El hash bcrypt aquí es un ejemplo. En producción, genera tu propio hash.
-- - Para generar un hash real, ejecuta: bcrypt.hashSync('', 10) en Node.js
-- - Todos los usuarios tienen el mismo hash porque todos tienen contraseña vacía
--
-- USO:
-- 1. Conecta a tu base de datos PostgreSQL
-- 2. Ejecuta este script completo
-- 3. Verifica los datos con las queries al final del script

-- =====================================================
-- STEP 1: INSERT LOCATIONS
-- =====================================================

-- Mallorca location
INSERT INTO locations (name, description, "isActive", "createdAt", "updatedAt")
VALUES ('Mallorca', 'Isla de Mallorca, España', true, NOW(), NOW())
ON CONFLICT (name) DO NOTHING;

-- =====================================================
-- STEP 2: INSERT USERS
-- =====================================================
-- Nota: Las contraseñas son strings vacías hasheadas con bcrypt
-- Usando bcrypt con salt rounds = 10
-- Para usuarios: admin@tradebinder.com, john@example.com, jane@example.com

-- Obtener el ID de Mallorca
DO $$
DECLARE
    mallorca_id INTEGER;
    -- Hash bcrypt de un string vacío con salt rounds 10
    empty_password_hash TEXT := '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy';
BEGIN
    -- Obtener ID de Mallorca
    SELECT id INTO mallorca_id FROM locations WHERE name = 'Mallorca';
    
    -- Insert users
    INSERT INTO users (email, username, password, "locationId", avatar, "isActive", "createdAt", "updatedAt")
    VALUES 
        ('admin@tradebinder.com', 'admin', empty_password_hash, mallorca_id, NULL, true, NOW(), NOW()),
        ('john@example.com', 'john_doe', empty_password_hash, mallorca_id, NULL, true, NOW(), NOW()),
        ('jane@example.com', 'jane_smith', empty_password_hash, mallorca_id, NULL, true, NOW(), NOW())
    ON CONFLICT (email) DO NOTHING;
END $$;

-- =====================================================
-- STEP 3: INSERT CARDS
-- =====================================================

INSERT INTO cards (name, "manaCost", type, subtype, rarity, text, "flavorText", power, toughness, loyalty, "imageUrl", artist, number, "isActive", "createdAt", "updatedAt")
VALUES 
    (
        'Lightning Bolt',
        '{R}',
        'Instant',
        NULL,
        'Common',
        'Lightning Bolt deals 3 damage to any target.',
        NULL,
        NULL,
        NULL,
        NULL,
        'https://cards.scryfall.io/large/front/d/5/d573ef03-4730-45aa-93dd-e45ac1dbaf4a.jpg?1559591645',
        'Christopher Rush',
        '161',
        true,
        NOW(),
        NOW()
    ),
    (
        'Black Lotus',
        '{0}',
        'Artifact',
        NULL,
        'Rare',
        '{T}, Sacrifice Black Lotus: Add three mana of any one color.',
        NULL,
        NULL,
        NULL,
        NULL,
        'https://cards.scryfall.io/large/front/b/0/b0faa7f2-b547-42c4-a810-839da50dadfe.jpg?1559591477',
        'Christopher Rush',
        '232',
        true,
        NOW(),
        NOW()
    ),
    (
        'Counterspell',
        '{U}{U}',
        'Instant',
        NULL,
        'Common',
        'Counter target spell.',
        NULL,
        NULL,
        NULL,
        NULL,
        'https://cards.scryfall.io/large/front/0/d/0df55e3f-14de-46ef-b6b1-616618724d9e.jpg?1559591713',
        'Mark Poole',
        '61',
        true,
        NOW(),
        NOW()
    ),
    (
        'Serra Angel',
        '{3}{W}{W}',
        'Creature — Angel',
        'Angel',
        'Uncommon',
        'Flying, vigilance',
        NULL,
        '4',
        '4',
        NULL,
        'https://cards.scryfall.io/large/front/f/8/f8ac5006-91bd-4803-93da-f87cf196dd2f.jpg?1559591394',
        'Douglas Shuler',
        '25',
        true,
        NOW(),
        NOW()
    ),
    (
        'Shivan Dragon',
        '{4}{R}{R}',
        'Creature — Dragon',
        'Dragon',
        'Rare',
        'Flying
{R}: Shivan Dragon gets +1/+0 until end of turn.',
        NULL,
        '5',
        '5',
        NULL,
        'https://cards.scryfall.io/large/front/f/e/fefbf149-f988-4f8b-9f53-56f5878116a6.jpg?1559591401',
        'Melissa A. Benson',
        '143',
        true,
        NOW(),
        NOW()
    )
ON CONFLICT DO NOTHING;

-- =====================================================
-- STEP 4: INSERT EDITIONS
-- =====================================================

INSERT INTO editions (name, "releaseDate", "hasFoil", "createdAt", "updatedAt")
VALUES 
    ('Alpha', '1993-08-05', false, NOW(), NOW()),
    ('Beta', '1993-10-04', false, NOW(), NOW()),
    ('Unlimited', '1993-12-01', false, NOW(), NOW())
ON CONFLICT DO NOTHING;

-- =====================================================
-- STEP 5: INSERT LISTINGS
-- =====================================================

DO $$
DECLARE
    admin_user_id INTEGER;
    john_user_id INTEGER;
    jane_user_id INTEGER;
    
    black_lotus_card_id INTEGER;
    lightning_bolt_card_id INTEGER;
    counterspell_card_id INTEGER;
    
    alpha_edition_id INTEGER;
    beta_edition_id INTEGER;
    unlimited_edition_id INTEGER;
    
    mallorca_location_id INTEGER;
BEGIN
    -- Get user IDs
    SELECT id INTO admin_user_id FROM users WHERE email = 'admin@tradebinder.com';
    SELECT id INTO john_user_id FROM users WHERE email = 'john@example.com';
    SELECT id INTO jane_user_id FROM users WHERE email = 'jane@example.com';
    
    -- Get card IDs
    SELECT id INTO black_lotus_card_id FROM cards WHERE name = 'Black Lotus';
    SELECT id INTO lightning_bolt_card_id FROM cards WHERE name = 'Lightning Bolt';
    SELECT id INTO counterspell_card_id FROM cards WHERE name = 'Counterspell';
    
    -- Get edition IDs
    SELECT id INTO alpha_edition_id FROM editions WHERE name = 'Alpha';
    SELECT id INTO beta_edition_id FROM editions WHERE name = 'Beta';
    SELECT id INTO unlimited_edition_id FROM editions WHERE name = 'Unlimited';
    
    -- Get location ID
    SELECT id INTO mallorca_location_id FROM locations WHERE name = 'Mallorca';
    
    -- Insert listings
    -- NOTA: Los comentarios en el código TypeScript no coinciden con los índices reales
    -- cards[0]=Lightning Bolt, cards[1]=Black Lotus, cards[2]=Counterspell
    -- editions[0]=Alpha, editions[1]=Beta, editions[2]=Unlimited
    
    -- Listing 1: admin - cards[0] (Lightning Bolt) - editions[0] (Alpha)
    -- (Comentario incorrecto en el código dice "Black Lotus - Alpha")
    INSERT INTO listings (
        "userId", "cardId", "editionId", "locationId", condition, "isFoil", 
        price, quantity, description, images, "isActive", "createdAt", "updatedAt"
    )
    VALUES (
        admin_user_id, lightning_bolt_card_id, alpha_edition_id, mallorca_location_id,
        'near_mint', false, 2500.00, 1,
        'Black Lotus Alpha en perfecto estado. Disponible para entrega en Mallorca.',
        ARRAY['https://example.com/user-black-lotus-1.jpg', 'https://example.com/user-black-lotus-2.jpg'],
        true, NOW(), NOW()
    );
    
    -- Listing 2: john - cards[1] (Black Lotus) - editions[1] (Beta)
    -- (Comentario incorrecto en el código dice "Lightning Bolt - Beta")
    INSERT INTO listings (
        "userId", "cardId", "editionId", "locationId", condition, "isFoil", 
        price, quantity, description, images, "isActive", "createdAt", "updatedAt"
    )
    VALUES (
        john_user_id, black_lotus_card_id, beta_edition_id, mallorca_location_id,
        'lightly_played', false, 150.00, 1,
        'Lightning Bolt Beta con ligero desgaste en los bordes. Precio negociable.',
        ARRAY['https://example.com/user-lightning-bolt-1.jpg'],
        true, NOW(), NOW()
    );
    
    -- Listing 3: jane - Counterspell Unlimited
    INSERT INTO listings (
        "userId", "cardId", "editionId", "locationId", condition, "isFoil", 
        price, quantity, description, images, "isActive", "createdAt", "updatedAt"
    )
    VALUES (
        jane_user_id, counterspell_card_id, unlimited_edition_id, mallorca_location_id,
        'near_mint', false, 75.00, 1,
        'Counterspell Unlimited en excelente estado. Envío disponible.',
        ARRAY['https://example.com/user-counterspell-1.jpg'],
        true, NOW(), NOW()
    );
END $$;

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Verificar los datos insertados
SELECT 'Locations' as table_name, COUNT(*) as count FROM locations
UNION ALL
SELECT 'Users', COUNT(*) FROM users
UNION ALL
SELECT 'Cards', COUNT(*) FROM cards
UNION ALL
SELECT 'Editions', COUNT(*) FROM editions
UNION ALL
SELECT 'Listings', COUNT(*) FROM listings;
