#pragma once

#include <mysql.h>

class Database
{
public:
    static MYSQL* connect();
};