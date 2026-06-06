#include "../include/Database.h"
#include <iostream>

MYSQL* Database::connect()
{
    MYSQL* conn = mysql_init(NULL);

    if (conn == NULL)
    {
        std::cout << "mysql_init() failed" << std::endl;
        return nullptr;
    }

    conn = mysql_real_connect(
        conn,
        "localhost",
        "root",
        "root123",      // Change if your MySQL password is different
        "smart_supermarket",
        3306,
        NULL,
        0
    );

    if (conn == NULL)
    {
        std::cout << "Connection Failed: "
                  << mysql_error(conn)
                  << std::endl;

        return nullptr;
    }

    return conn;
}