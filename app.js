$(document).ready(function() {

  $('#toggle-form').click(function() {
    $('#data-form').slideToggle();
  });

  $('#data-table-body').hide();
  
  // toggle table visibility on button click
  $('#toggle-table').click(function() {
    $('#data-table-body').slideToggle();
    $('#toggle-table').text(function(i, text) {
      return text === "Open Table" ? "Close Table " : "Open Table";
  })
  });


    $('#data-form').submit(function(e) {
      e.preventDefault(); // prevent form from submitting
      if ($('#data-form')[0].checkValidity()) { // check if form is valid
        var formData = {
          userId: $('#userId').val(),
          id: $('#id').val(),
          title: $('#title').val(),
          completed: $('#completed').val()
        };
        $.ajax({
          url: 'https://jsonplaceholder.typicode.com/todos',
          type: 'POST',
          data: formData,
          success: function(response) {
            console.log(response)
            // create new row in table with submitted data
            var newRow = '<tr><td>' + formData.userId + '</td><td>' + formData.id + '</td><td>' + formData.title + '</td><td>' + formData.completed + '</td></tr>';
            $('#data-table-body').append(newRow);
            $('#data-form')[0].reset(); // reset form after submission
          },
          error: function(error) {
            console.log(error);
          }
        });
      }
    });



    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/todos',
      type: 'GET',
      dataType: 'json',
      success: function(response) {
        for (var i = 0; i < response.length; i++) {
          // create new row in table with user data and edit/delete buttons
          var newRow = '<tr><td>' + response[i].userId + '</td><td>' + response[i].id + '</td><td>' + response[i].title + '</td><td>' + response[i].completed + '</td><td><button class="edit-btn">Edit</button></td><td><button class="delete-btn">Delete</button></td></tr>';
          $('#data-table-body').append(newRow);
        }

      
        $('th').click(function() {
          var column = $(this).index();
          var order = -1;
      
          if ($(this).hasClass('asc')) {
            $(this).removeClass('asc').addClass('desc');
            order = 1;
          } else {
            $(this).removeClass('desc').addClass('asc');
          }
      
          response.sort(function(a, b) {
            var val1 = a[Object.keys(a)[column]];
            var val2 = b[Object.keys(b)[column]];
      
            if (typeof val1 === 'string') {
              val1 = val1.toLowerCase();
              val2 = val2.toLowerCase();
            }
      
            if (val1 < val2) {
              return order;
            }
      
            if (val1 > val2) {
              return -order;
            }
      
            return 0;
          });
      
          $('#data-table-body').empty();
      
          for (var i = 0; i < response.length; i++) {
            var newRow = '<tr><td>' + response[i].userId + '</td><td>' + response[i].id + '</td><td>' + response[i].title + '</td><td>' + response[i].completed + '</td></tr>';
            $('#data-table-body').append(newRow);
          }
        });
        },
        error: function(error) {
          console.log(error);
        }
    
      });
    // edit button functionality
$(document).on('click', '.edit-btn', function() {
  // populate form fields with row data
  var row = $(this).closest('tr');
  var idw = row.find('td:eq(0)').text();
  var name = row.find('td:eq(1)').text();
  var age = row.find('td:eq(2)').text();
  var city = row.find('td:eq(3)').text();
  $('#userId').val(idw);
  $('#id').val(name);
  $('#title').val(age);
  $('#completed').val(city);
  $('#submit-btn').text('Update'); // change submit button text to "Update"
  $('#toggle-form').click(); // show form if it's hidden
  
  // update button functionality
  $('#data-form').off('submit').on('submit', function(e) {
    e.preventDefault(); // prevent form from submitting
    if ($('#data-form')[0].checkValidity()) { // check if form is valid
      var updatedRow = '<td>' + $('#userId').val() + '</td><td>' + $('#id').val() + '</td><td>' + $('#title').val() + '</td><td>' + $('#completed').val() + '</td><td><button class="edit-btn">Edit</button></td><td><button class="delete-btn">Delete</button></td>';
      $.ajax({
        url: 'https://jsonplaceholder.typicode.com/todos/' + idw,
        type: 'PUT',
        data: {
          userId: $('#userId').val(),
          id: $('#id').val(),
          title: $('#title').val(),
          completed: $('#completed').val()
        },
        success: function(response) {
          row.html(updatedRow); // replace row with updated data
          $('#submit-btn').text('Add'); // change submit button text back to "Add"
          $('#data-form')[0].reset(); // reset form after submission
          $('#toggle-form').click(); // hide form
        },
        error: function(error) {
          console.log(error);
        }
      });
    }
  });
});





    $('#data-table-body').on('click', '.delete-btn', function() {
      var $row = $(this).closest('tr'); // Get the parent row of the delete button
      var id = $row.find('td:first-child').text(); // Get the id of the data to be deleted
  
      // Send an AJAX call to delete the data from the server
      $.ajax({
        url: 'https://jsonplaceholder.typicode.com/todos/' + id,
        type: 'DELETE',
        success: function(response) {
          // If the data is successfully deleted, remove the corresponding row from the table
          $row.remove();
        },
        error: function(error) {
          console.log(error);
        }
      });
    });

  
    
  });
  
  
  
  
  

  