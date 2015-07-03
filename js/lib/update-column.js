var SP = new SPjs('/portfolio/_vti_bin/lists.asmx', 'Corporate IT Demands');

$('#parse').click(function (evt) {
  evt.preventDefault();
  parse({
    listname: $('#listname').val(),
    idColumn: $('#id-column').val(),
    columns:  $('#columns').val().split(/\s+/),
    data:     $('#data').val().split(/\r?\n/)
  });
});
$('#results').on('click', '#update', function (evt) {
  evt.preventDefault();
  var btn = $(evt.currentTarget).button('loading');
  var updateData = _(window.newInfo.data).chain().map(function (row) {
    var res = { id: row[0], fields: {} };
    _(window.newInfo.columns).each(function (col, i) {
      if (row[i+3].newValue !== row[i+3].oldValue) {
        res.fields[col] = row[i+3].newValue.replace('&', '&amp;');
      }
    });
    if (_(res.fields).keys().length === 0) {
      return false;
    }
    return res;
  }).compact().value();
  var req = SP.updateFields(updateData);
  req.fail(function () {
    btn.text('Error');
  });
  req.done(function () {
    btn.text('Done!');
  });
});

var tmplTable = _.template( $('#table-tmpl').html() );

function parse (info) {
  $('#results').html('Searching...');

  info.data = cleanData(info);
  findProjects(info).done(function (results) {
    showDiff(info, results);
  });
}

function cleanData(info) {
  return _(info.data).chain().map(function (line) {
    var lineData = _(line.split(/\t/)).map(function (val) {
      return $.trim(val);
    });
    if (lineData.length != info.columns.length + 1) {
      console.log('Removed line (# of Cols): %o', lineData);
      return false;
    }
    if (!lineData[0]) {
      console.log('Removed line (No ID value): %o', lineData);
      return false;
    }
    return lineData;
  }).compact().value();
}

function findProjects (info) {
  var dfdResult = $.Deferred();
  var conditions = new caml.Or();
  _(info.data).chain().pluck(0).each(function (idVal) {
    conditions.add( caml.Eq(info.idColumn, caml.Text(idVal.replace('&', '&amp;'))) );
  });
  var query = new caml.Query(conditions);

  var SP = new SPjs('/portfolio/_vti_bin/lists.asmx', info.listname);
  var req = SP.getRows([], query.toString(), '<rowLimit>9999</rowLimit>');
  req.fail(function () {
    alert('An error occurred. Please try again.');
  });
  req.done(function (xmlRows) {
    var results = [];
    $(xmlRows).each(function (i, row) {
      var rowResult = {}, r = $(row);
      _(['ID', 'Title', info.idColumn].concat(info.columns)).each(function (col) {
        rowResult[col] = r.attr('ows_'+col);
      });
      results.push(rowResult);
    });
    dfdResult.resolve(results);
  });
  return dfdResult;
}

function showDiff (newInfo, oldInfo) {
  var newDataList = [];
  _(newInfo.data).chain().each(function (newRow) {
    var idVal = newRow[0];
    var oldRow = _(oldInfo).where( _.object([newInfo.idColumn], [idVal]) );
    if (oldRow.length > 1) {
      _(oldRow).each(function (r) {
        console.log('Removed line (Multiple ID match): %o', r);
      });
      oldInfo = _(oldInfo).reject(function (oldRow) {
        return oldRow[newInfo.idColumn] === idVal;
      });
      return;
    }
    if (oldRow.length === 0) {
      console.log('No match for %o = %o', newInfo.idColumn, idVal);
      return;
    }
    _(newInfo.columns).each(function (col, i) {
      newRow[i+1] = {newValue: newRow[i+1], oldValue: oldRow[0][col]}
    });

    newRow.unshift(oldRow[0].Title);
    newRow.unshift(oldRow[0].ID);
    newDataList.push(newRow);
  });
  newInfo.data = newDataList;
  window.newInfo = newInfo;
  $('#results').html( tmplTable(newInfo) );
}
