-- CreateTable
CREATE TABLE "users" (
    "id_user" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nickname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "orders" (
    "id_order" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_user" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "password_panel" TEXT NOT NULL,
    "total_cost" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "orders_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users" ("id_user") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "items" (
    "id_item" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cost" REAL NOT NULL,
    "size" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Order_Menu" (
    "id_order" INTEGER NOT NULL,
    "id_item" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "observation" TEXT,

    PRIMARY KEY ("id_order", "id_item"),
    CONSTRAINT "Order_Menu_id_order_fkey" FOREIGN KEY ("id_order") REFERENCES "orders" ("id_order") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_Menu_id_item_fkey" FOREIGN KEY ("id_item") REFERENCES "items" ("id_item") ON DELETE RESTRICT ON UPDATE CASCADE
);
