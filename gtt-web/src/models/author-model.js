module.exports={
   
    createAuthor:function(){
         data="Form data was inserted";
         return data;
    },
    fetchAuthor:function(){
      data="data was fetched";
      return data;   
    },
    editAuthor:function(editData){
      data= "Data is edited by id: "+editData;
      return data; 
    },
    UpdateAuthor:function(updateId){
      data= "Data was updated by id: "+updateId;
      return data; 
    },
    deleteAuthor:function(deleteId){
      data= "Data was deleted by id: "+deleteId;
      return data; 
    }
  }