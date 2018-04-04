var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let template = $('#message-template').html();
    let html = Mustache.render(template, {
        from: message.from,
        text: message.text,
        createdAt: formattedTime
    });    
    $('#messages').append(html);
});

socket.on('newLocationMessage', function(message) {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let template = $('#location-message-template').html();
    let html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });    
    $('#messages').append(html);
});

$("#message-form").on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: $('#txtMessage').val()
    }, function (data) {
        $('#txtMessage').val('');
    });
});

let locationButton = $('#send-location');

locationButton.on('click', function (e) {
    if (!navigator.geolocation) {
        return alert('Geo location not supported by your browser.');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...')

    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location.');
    });
});