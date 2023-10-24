# Book Reviews Back End

## Description

- This project uses Express to deliver a server-side online book review application and integrate it with a secure REST API server which will use authentication at session level using JWT.
- This project does not have a front end, so it can be tested on an API platform like: https://www.postman.com
- Non-authorized users are able to do the following:
     - Register an account.
     - Retrieve full book list.
     - Retrieve specific book via ISNB (International Standard Book Number), author, or title.
     - Retrieve a review for a specific book.
- Authorized users are able to do the following:
     - Add/delete a book review.

## Getting Started

### Dependencies
- Tested on Windows 10
- Used NPM to install packages required to run server. Download at: https://nodejs.org/en/download
- Tested on Node.js version v18.16.0
- Tested on: https://www.postman.com
     - Create a free account
     - Download Postman desktop (since application will be run locally)

### Installation
- Download Node.JS and NPM: https://nodejs.org/en/download
- Download project from GitHub
- Open a new terminal
- Ensure you are in the project folder
- Run the following command to install all the packages that are required for running the server (without start and end quotes):
  "npm install --s"

### Executing the Program
- Open a new terminal
- Ensure you are in the project folder
- Start the server using the below command in the terminal (without start and end quotes):
  "npm start"
- This will start the server (on port 5000). Since there is no front-end, see the next section 'Testing the Program' to see how to test this project.

### Testing the Program
- Now that the server has been started, you can test different GET, POST, PUT, and DELETE HTTP requests.
- First, create a free account at: https://www.postman.com
- Create a workspace and open a new HTTP request window.
- Input "localhost:5000" into the URL field. (If you have not already, you will be prompted to download Postman Desktop agent, download and executing this will allow you test local host)

- What you can do (non-authorized user) - hit 'SEND' after making the below inputs to see response" 

     - Retrieve all book list (this is the content of the file "router --> booksdb.js"
          - HTTP request type: GET
          - URL: localhost:5000/books
          - ![image](https://github.com/MaayonThayaparan/bookReviews-Express/assets/43158629/9c810656-a4c8-4270-91dc-caa5eebb44bd)

     - Retrieve book via specific ISBN #)
          - HTTP request type: GET
          - URL: localhost:5000/isbn/:isbn
          - ![image](https://github.com/MaayonThayaparan/bookReviews-Express/assets/43158629/a6868b2f-6af4-4a4b-af20-2c4c49179089)

     - Retrieve books filtered via author
          - HTTP request type: GET
          - URL: localhost:5000/author/:author
          - ![image](https://github.com/MaayonThayaparan/bookReviews-Express/assets/43158629/0ca278da-6996-4adf-bd1f-1e453cf26b2c)

     - Retrieve books filtered via title
          - HTTP request type: GET
          - URL: localhost:5000/title/:title
          - ![image](https://github.com/MaayonThayaparan/bookReviews-Express/assets/43158629/054298f3-dc65-4b35-afc6-e7da791e6c51)

     - Retrieve review for specific book
          - HTTP request type: GET
          - URL: localhost:5000/review/:isbn
          - ![image](https://github.com/MaayonThayaparan/bookReviews-Express/assets/43158629/ea353b97-cf8a-4b4f-979e-3e19eb168a64)
  
     - Register a new user (if user already exists you will get a message stating so)
          - HTTP request type: POST
          - URL: localhost:5000/register
          - Select 'Body'  >> 'raw' >> 'JSON' and pass parameters "username" and "password" in JSON format
          - ![image](https://github.com/MaayonThayaparan/bookReviews-Express/assets/43158629/7c71f415-ecb8-4891-bf8d-97433d97b0aa)
      
- What you can do (authorized user) - hit 'SEND' after making the below inputs to see response" 

     - Login
          - HTTP request type: POST
          - URL: localhost:5000/customer/login
          - Select 'Body'  >> 'raw' >> 'JSON' and pass parameters "username" and "password" in JSON format
          - ![image](https://github.com/MaayonThayaparan/bookReviews-Express/assets/43158629/e6d29246-beb6-44f1-a613-b1a135f98ff5)

     - Add Revuew
          - HTTP request type: PUT
          - URL: localhost:5000/customer/auth/review/:isbn
          - Select 'Body'  >> 'raw' >> 'JSON' and pass parameter "review" in JSON format
          - ![image](https://github.com/MaayonThayaparan/bookReviews-Express/assets/43158629/c14213c6-c0d7-4aba-8964-b93650b0fb65)

     - Add Revuew
          - HTTP request type: DELETE
          - URL: localhost:5000/customer/auth/review/:isbn
          - ![image](https://github.com/MaayonThayaparan/bookReviews-Express/assets/43158629/1683b928-c64b-4685-8907-708fdddb8052)

  ## Future Optimizations
  - Build a front-end for this project.
  - Connect an actual database that can be updated. 



      



          
            

         
      
       



