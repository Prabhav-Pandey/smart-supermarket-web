#include <iostream>
#include <iomanip>
#include <string>
#include "../include/Database.h"

using namespace std;

void viewProducts(MYSQL* conn)
{
    if (mysql_query(conn, "SELECT * FROM products"))
    {
        cout << "Query Failed: " << mysql_error(conn) << endl;
        return;
    }

    MYSQL_RES* result = mysql_store_result(conn);
    MYSQL_ROW row;

    cout << "\n==================================================\n";
    cout << left
         << setw(12) << "ID"
         << setw(20) << "NAME"
         << setw(10) << "PRICE"
         << setw(10) << "STOCK"
         << endl;
    cout << "==================================================\n";

    while ((row = mysql_fetch_row(result)))
    {
        cout << left
             << setw(12) << row[0]
             << setw(20) << row[1]
             << setw(10) << row[2]
             << setw(10) << row[3]
             << endl;
    }

    mysql_free_result(result);
}

void addProduct(MYSQL* conn)
{
    string name;
    double price;
    int stock;

    cin.ignore();

    cout << "\nEnter Product Name: ";
    getline(cin, name);

    cout << "Enter Price: ";
    cin >> price;

    cout << "Enter Stock: ";
    cin >> stock;

    string query =
        "INSERT INTO products(product_name, price, stock) VALUES('" +
        name + "'," +
        to_string(price) + "," +
        to_string(stock) + ")";

    if (mysql_query(conn, query.c_str()) == 0)
        cout << "\nProduct Added Successfully!\n";
    else
        cout << "\nError: " << mysql_error(conn) << endl;
}

void searchProduct(MYSQL* conn)
{
    string name;

    cin.ignore();

    cout << "\nEnter Product Name: ";
    getline(cin, name);

    string query =
        "SELECT * FROM products WHERE product_name='" + name + "'";

    if (mysql_query(conn, query.c_str()))
    {
        cout << mysql_error(conn) << endl;
        return;
    }

    MYSQL_RES* result = mysql_store_result(conn);
    MYSQL_ROW row = mysql_fetch_row(result);

    if (row)
    {
        cout << "\nProduct Found\n";
        cout << "ID: " << row[0] << endl;
        cout << "Name: " << row[1] << endl;
        cout << "Price: " << row[2] << endl;
        cout << "Stock: " << row[3] << endl;
    }
    else
    {
        cout << "\nProduct Not Found\n";
    }

    mysql_free_result(result);
}

void updateStock(MYSQL* conn)
{
    int id, stock;

    cout << "\nEnter Product ID: ";
    cin >> id;

    cout << "Enter New Stock: ";
    cin >> stock;

    string query =
        "UPDATE products SET stock=" +
        to_string(stock) +
        " WHERE product_id=" +
        to_string(id);

    if (mysql_query(conn, query.c_str()) == 0)
        cout << "\nStock Updated Successfully!\n";
    else
        cout << "\nError: " << mysql_error(conn) << endl;
}

void deleteProduct(MYSQL* conn)
{
    int id;

    cout << "\nEnter Product ID: ";
    cin >> id;

    string query =
        "DELETE FROM products WHERE product_id=" +
        to_string(id);

    if (mysql_query(conn, query.c_str()) == 0)
        cout << "\nProduct Deleted Successfully!\n";
    else
        cout << "\nError: " << mysql_error(conn) << endl;
}

int main()
{
    MYSQL* conn = Database::connect();

    if (!conn)
        return 1;

    int choice;

    do
    {
        cout << "\n\n===== SMART SUPERMARKET =====\n";
        cout << "1. View Products\n";
        cout << "2. Add Product\n";
        cout << "3. Search Product\n";
        cout << "4. Update Stock\n";
        cout << "5. Delete Product\n";
        cout << "6. Exit\n";
        cout << "\nEnter Choice: ";
        cin >> choice;

        switch (choice)
        {
        case 1:
            viewProducts(conn);
            break;

        case 2:
            addProduct(conn);
            break;

        case 3:
            searchProduct(conn);
            break;

        case 4:
            updateStock(conn);
            break;

        case 5:
            deleteProduct(conn);
            break;

        case 6:
            cout << "\nThank You!\n";
            break;

        default:
            cout << "\nInvalid Choice!\n";
        }

    } while (choice != 6);

    mysql_close(conn);

    return 0;
}